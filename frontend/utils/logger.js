const getRefererName = (referer) => {
  if (typeof referer === 'string') {
    return referer;
  }
  if (referer._name) {
    return referer._name;
  }
  return referer;
};

export default function whiteboardLog(referer, message, error) {
  // eslint-disable-next-line no-empty
  if (process.env.NODE_ENV === 'production') {
  } else if (error) {
    console.log(`%c${getRefererName(referer)}:`, 'color: #9C26B0');
    console.error(message);
  } else {
    console.log(`%c${getRefererName(referer)}:`, 'color: #9C26B0');
    console.log(message);
  }
}
