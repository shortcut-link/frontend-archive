import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const key = '6LdPb7MUAAAAAEEVmEYPQq9kE6TzPPgfcBwua57l';

/**
 * reCaptcha
 * @param {{ onChange: function }} onChange Callback that is called when passing a captcha
 */
export const Captcha = ({ onChange }) => (
  <ReCAPTCHA sitekey={key} onChange={onChange} />
);
