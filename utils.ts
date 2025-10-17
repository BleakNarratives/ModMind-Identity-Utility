import React from 'react';
import { GoogleGenAI } from '@google/genai';
import { UserIdentity } from './types';

// SECURITY ADVISORY: In a production environment, the API key should never be
// exposed on the client-side. This implementation uses a client-side key for
// demonstration purposes only. The recommended practice is to create a backend
// service that proxies requests to the AI API, keeping the key secure on the server.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
export const AiContext = React.createContext(ai);

/**
 * Generates a consistent HSL color based on a string hash.
 * This ensures the same user ID always gets the same color for UI consistency.
 * Fortified: Now handles undefined input gracefully and uses a more stable hash.
 */
const stringToHslColor = (str: string | undefined, s: number, l: number): string => {
  // Guard against undefined/null input, returning a safe, neutral gray.
  if (!str) return `hsl(0, 0%, 70%)`; 

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const h = hash % 360;
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const generateId = (): string => {
  // Use crypto.randomUUID for a cryptographically secure, standard unique identifier.
  return crypto.randomUUID();
};

export const generateUserIdentity = (): UserIdentity => {
  const newId = generateId();
  // Generate a vibrant color from the ID string.
  const newColor = stringToHslColor(newId, 80, 60); // Saturation 80%, Lightness 60%
  return {
    id: newId,
    color: newColor,
  };
};

/**
 * Copies text to the clipboard using the older but reliable document.execCommand.
 * Fortified: Switched from navigator.clipboard for better compatibility in sandboxed environments.
 */
export const copyToClipboard = (text: string) => {
  const input = document.createElement('textarea');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand('copy');
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  } finally {
    document.body.removeChild(input);
  }
};