import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { City, countryList } from './component/pages/discover/countryList';

// function to extract geo location from NextRequest
function getGeoLocation(request: NextRequest) {
  request.geo?.city;
  request.geo?.country;
  const targetCountry = countryList.find(
    (country) => country.code === request.geo?.country?.toLowerCase()
  );
  if (targetCountry) {
    const targetCityIn = targetCountry.cities.includes(request.geo?.city ?? '');
    return {
      city: targetCityIn
        ? (request.geo?.city as City)
        : targetCountry.cities[0],
      country: targetCountry.code,
      hasGeo: true,
      inList: true,
    } as const;
  }
  return {
    city: request.geo?.city,
    country: request.geo?.country,
    hasGeo: false,
    inList: false,
  } as const;
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the geo location from the request
  const geo = getGeoLocation(request);
  console.log(geo);
  // if the request has geo location, check if geo location is in the list of countries
  if (geo.hasGeo && geo.inList) {
    // if the geo location is in the list, set cookie
    request.cookies.set(
      'location',
      JSON.stringify({
        city: geo.city,
        country: geo.country,
      })
    );
    // if request is in discover page, redirect to the geo location
    if (request.nextUrl.pathname === '/discover') {
      return NextResponse.redirect(
        new URL(`/${geo.country}/${geo.city}`, request.url)
      );
    }
  }
  return NextResponse.next();
  //   return NextResponse.redirect(new URL('/about-2', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|static|favicon.ico).*)',
  ],
};
