import axios from 'axios'
import querystring from 'querystring'
import { TokenPayload } from './types'

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize?'
const SPOTIFY_CLIENT_ID = '94c3aab0549f494c80c8585d19b6af2f'
const SPOTIFY_REDIRECT_URI =
  process.env.NODE_ENV === 'production'
  ? 'https://www.passtheaux.live/callback'
  : 'http://localhost:3000/callback'

const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

const base64Encode = (a: ArrayBuffer) => {
  let str = "";
  const bytes = new Uint8Array(a);
  for (var i = 0; i < bytes.byteLength; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const challengeFromVerifier = async (verifier: string): Promise<string> => {
  const hashed = await sha256(verifier);
  return base64Encode(hashed);
}

const dec2hex = (dec: number) => {
  return ('0' + dec.toString(16)).substr(-2)
}

const generateVerifier = () => {
  const array = new Uint32Array(56/2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
}

export const loginRedirect = async () => {
  const verifier = generateVerifier();
  localStorage.setItem('verifier', verifier)
  const challenge = await challengeFromVerifier(verifier)

  const path = window.location.pathname

  const url = SPOTIFY_AUTH_URL + querystring.stringify({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope: 'user-read-playback-state user-modify-playback-state streaming user-read-email user-read-private',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    state: path
  })
  window.location.replace(url)
}

export const getUserToken = async (code: string): Promise<TokenPayload> => {
  const res = await axios.post(`https://accounts.spotify.com/api/token`, querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_verifier: localStorage.getItem('verifier')
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return res.data
}

export const refreshUserToken = async (refresh_token: string): Promise<TokenPayload> => {
  const res = await axios.post(`https://accounts.spotify.com/api/token`, querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    grant_type: 'refresh_token',
    refresh_token
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return res.data
}


export default {
  loginRedirect,
  getUserToken,
  refreshUserToken
}
