import { useLoginModal } from '@/component/modals/login/LoginModal';
import { Button, Avatar } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const LoginModal = dynamic(() => import('@/component/modals/login/LoginModal'));

const LoginBTN = () => {
  const { data: session, status } = useSession();
  const { open } = useLoginModal();
  if (!session) return <Button onClick={open}>Login</Button>;
  return null;
};

const ProfileAvatar = () => {
  const { data: session, status } = useSession();
  if (!session) return null;

  return <Avatar src={session.user.image ?? session.user.name ?? 'A'} />;
};

const Profile = () => {
  return (
    <>
      <LoginBTN />
      <ProfileAvatar />
      <LoginModal />
    </>
  );
};
export default Profile;
