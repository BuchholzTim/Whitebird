/* eslint-disable no-console */
const getRefererName = (referer) => {
  if (typeof referer === 'string') {
    return referer;
  }
  if (referer._name) {
    return referer._name;
  }
  return referer;
};

export default function whiteboardLog(referer, messages, error) {
  if (process.env.NODE_ENV !== 'production') {
    const color = error ? '#9C26B0' : '#9C26B0';
    console.log(`%c${getRefererName(referer)}:`, `color: ${color}`);

    if (Array.isArray(messages)) {
      messages.forEach((message) => {
        if (error) {
          console.error(message);
        } else {
          console.log(message);
        }
      });
    } else if (error) {
      console.error(messages);
    } else {
      console.log(messages);
    }
  }
}
