import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const key = '6LdPb7MUAAAAAEEVmEYPQq9kE6TzPPgfcBwua57l';

interface CaptchaProps {
  onChange: (payload: void) => void;
}

export const Captcha: React.FC<CaptchaProps> = ({ onChange }) => (
  <ReCAPTCHA sitekey={key} onChange={token => onChange()} />
);
