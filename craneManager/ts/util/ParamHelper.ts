/**
 * 参数工具类 解析?后的参数
 */
export class ParamHelper {
    source: string;

    params: { [key: string]: string; } = {};

    constructor(source: string) {
        this.source = source;
        if (source.indexOf("?") != -1 && source.indexOf("?") != source.length - 1) {
            let params = source.substring(source.indexOf("?") + 1);
            let strings = params.split("&");
            for (let paramMap of strings) {
                let paramKeyAndValue = paramMap.split("=");
                if (paramKeyAndValue.length == 2) {
                    this.params[paramKeyAndValue[0]] = paramKeyAndValue[1];
                }
            }
        }
    }

    public get(key: string) {
        return this.params[key] !== undefined ? this.params[key] : "";
    }

    public getAll() {
        return this.params;
    }
}