import { Metadata } from 'next';
import EditProfileClient from './EditProfileClient';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Page for editing user profile information.',
};

export default function EditProfilePage() {
  return <EditProfileClient />;
}
