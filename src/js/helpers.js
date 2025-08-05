import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/*
export const getJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    // Catching and throwing errors
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};


export const sendJson = async function (url, uploadData) {
  try {
    const fetchpro = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const response = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    // Catching and throwing errors
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};
*/

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchpro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    // Catching and throwing errors
    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (error) {
    throw error;
  }
};
