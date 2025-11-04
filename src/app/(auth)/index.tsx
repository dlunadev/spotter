import { AuthRoutesLink } from '@/utils/enum/routes';
import { Redirect } from 'expo-router';
import React from 'react';

export default function index() {
  return <Redirect href={AuthRoutesLink.SIGN_IN} />;
}
