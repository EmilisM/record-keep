export const getDefaultResourceImage = (src?: string): string => {
  return src
    ? `data:image;base64,${src}`
    : 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fnandostudio%2Fbe-the-dj%2F128%2Fvinyl-icon.png&f=1&nofb=1';
};
