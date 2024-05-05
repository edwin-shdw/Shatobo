export function getTikTokVideoId(pathname: string) {
  const paths = pathname.split('/');
  if(paths[paths.length - 2] !== 'video') return '';
  return paths[paths.length - 1];
}
