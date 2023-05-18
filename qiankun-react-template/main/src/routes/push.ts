import qiankunUtil from '../qiankun'

async function push(...args) {
    return qiankunUtil.pushState.apply(qiankunUtil, args)
}

export default push
