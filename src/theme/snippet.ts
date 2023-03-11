/**
 * to generate color palette easily
 * use site like https://palx-pwa.pages.dev/
 * download the json and the run the following snippet
 */

// const coloors = {
//   base: '#8806CE',
//   black: '#463b4c',
//   gray: [
//     '#faf9fa',
//     '#efedf0',
//     '#e3e0e5',
//     '#d6d1d9',
//     '#c8c2cb',
//     '#b8b0bd',
//     '#a79cac',
//     '#918598',
//     '#76667f',
//     '#463b4c',
//   ],
//   violet: [
//     '#fcf8fe',
//     '#f5eafb',
//     '#eddaf8',
//     '#e5c9f4',
//     '#dcb6f1',
//     '#d2a0ec',
//     '#c687e7',
//     '#b667e1',
//     '#9f36d8',
//     '#630497',
//   ],
//   fuschia: [
//     '#fef8fd',
//     '#fbe8f8',
//     '#f7d7f2',
//     '#f4c5ec',
//     '#efb0e6',
//     '#eb97de',
//     '#e579d4',
//     '#dc4fc7',
//     '#c606a9',
//     '#780366',
//   ],
//   pink: [
//     '#fef8fa',
//     '#fbe9ef',
//     '#f7d9e4',
//     '#f4c7d7',
//     '#f0b3c8',
//     '#ec9cb8',
//     '#e680a4',
//     '#df5b89',
//     '#d21859',
//     '#820430',
//   ],
//   red: [
//     '#fdf8f7',
//     '#faeae7',
//     '#f7dbd6',
//     '#f3cac2',
//     '#efb7ad',
//     '#eaa194',
//     '#e48776',
//     '#dc644f',
//     '#cf2a0d',
//     '#7e1604',
//   ],
//   orange: [
//     '#fdf9f2',
//     '#f7ecd8',
//     '#f2dfbb',
//     '#ebd09c',
//     '#e4bf78',
//     '#dcab4f',
//     '#d3941e',
//     '#bb7c05',
//     '#946204',
//     '#573903',
//   ],
//   yellow: [
//     '#f9fbeb',
//     '#ebf2be',
//     '#dbe98d',
//     '#c9dd54',
//     '#b4d012',
//     '#a3bf06',
//     '#92aa05',
//     '#7d9204',
//     '#637303',
//     '#3a4402',
//   ],
//   lime: [
//     '#f4fcef',
//     '#dbf5cd',
//     '#c0eea7',
//     '#a0e57b',
//     '#7adb46',
//     '#4bcd06',
//     '#43b705',
//     '#3a9d05',
//     '#2e7c04',
//     '#1b4902',
//   ],
//   green: [
//     '#f1fcf3',
//     '#d3f6d8',
//     '#b1f0ba',
//     '#88e897',
//     '#55de6a',
//     '#0ccf2a',
//     '#05b920',
//     '#059f1c',
//     '#047e16',
//     '#024a0d',
//   ],
//   teal: [
//     '#f0fcf8',
//     '#d0f6e8',
//     '#abeed7',
//     '#80e6c2',
//     '#49dba8',
//     '#06cc87',
//     '#05b678',
//     '#059d67',
//     '#047c52',
//     '#024930',
//   ],
//   cyan: [
//     '#f2fbfd',
//     '#d7f2f7',
//     '#bae9f1',
//     '#98deeb',
//     '#70d2e3',
//     '#41c3da',
//     '#06afcd',
//     '#0596b0',
//     '#04778b',
//     '#024652',
//   ],
//   blue: [
//     '#f7f9fd',
//     '#e7eefa',
//     '#d6e1f7',
//     '#c3d4f3',
//     '#aec5ef',
//     '#96b4ea',
//     '#7ba0e5',
//     '#5988de',
//     '#2b67d5',
//     '#043796',
//   ],
//   indigo: [
//     '#faf9fe',
//     '#eeecfb',
//     '#e2def8',
//     '#d4cef5',
//     '#c5bef2',
//     '#b5abee',
//     '#a295ea',
//     '#8a7ae5',
//     '#6a56de',
//     '#2507ce',
//   ],
// };
// const coloors2 = {};
// for (const [key, value] of Object.entries(coloors)) {
//   let realKey = key;
//   if (key === 'violet') {
//     realKey = 'purple';
//   }
//   if (Array.isArray(value)) {
//     coloors2[realKey] = {};
//     value.forEach((v, i) => {
//       if (i === 0) {
//         coloors2[realKey][50] = v;
//         return;
//       }
//       coloors2[realKey][i * 100] = v;
//     });
//   } else {
//     coloors2[realKey] = value;
//   }
// }

// P.S this dosent include primary and secondary colors

export {};
