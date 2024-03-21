/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentToken?: API.Token } | undefined) {
  const { currentToken } = initialState || {};
  const { privSet = [], userCode } = currentToken || {};
  return {
    hasPrivilege: (route: any) => {
      return 'root' === userCode || privSet.includes(route.name + '.page')
    }
  };
}
