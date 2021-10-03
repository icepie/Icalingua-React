/**
 * https://gchat.qpic.cn/gchatpic_new/0/0-0-大写的Md5/0
 * @param md5
 */
export function getImageUrlByMd5(md5: string) {
  return 'https://gchat.qpic.cn/gchatpic_new/0/0-0-' + md5.toUpperCase() + '/0';
}

export default function getUserAvatarUrl(uin: number) {
  return `https://q1.qlogo.cn/g?b=qq&nk=${uin}&s=640`;
}
