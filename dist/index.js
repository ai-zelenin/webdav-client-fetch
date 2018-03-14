import {Observable} from "rxjs/Observable";

export class WebDavPath {
}

export class WebDav {
    constructor() {
        this.ns = "DAV:";
        this.ParserXML = new DOMParser();
    }

    ParseWebDavPathFromXML(stringXML) {
        const dom = this.ParserXML.parseFromString(stringXML, "application/xml");
        const responseList = dom.documentElement.getElementsByTagNameNS(this.ns, "response");
        const wdpArray = [];
        for (let i = 0; i < responseList.length; i++) {
            const wdp = new WebDavPath();
            const e = responseList.item(i);
            wdp.Name = e.getElementsByTagNameNS(this.ns, "displayname").item(0).innerHTML;
            wdp.Href = e.getElementsByTagNameNS(this.ns, "href").item(0).innerHTML;
            if (e.getElementsByTagNameNS(this.ns, "resourcetype").item(0).getElementsByTagNameNS(this.ns, "collection").length > 0) {
                wdp.IsDir = true;
            }
            else {
                wdp.ContentLengeth = +e.getElementsByTagNameNS(this.ns, "getcontentlength").item(0).innerHTML;
                wdp.ContentType = e.getElementsByTagNameNS(this.ns, "getcontenttype").item(0).innerHTML;
                wdp.Etag = e.getElementsByTagNameNS(this.ns, "getetag").item(0).innerHTML;
            }
            wdp.LastModified = e.getElementsByTagNameNS(this.ns, "getlastmodified").item(0).innerHTML;
            wdp.Status = e.getElementsByTagNameNS(this.ns, "status").item(0).innerHTML;
            wdpArray[i] = wdp;
        }
        return wdpArray;
    }

    Propfind(url, depth) {
        return new Observable(observer => {
            fetch(url, {
                method: "PROPFIND",
                headers: {
                    "Depth": String(depth)
                },
                mode: "cors",
            }).then(resp => {
                resp.text().then(text => {
                    observer.next(this.ParseWebDavPathFromXML(text));
                    observer.complete();
                }).catch(err => {
                    observer.error(err);
                    observer.complete();
                });
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    Upload(url, file) {
        return new Observable(observer => {
            fetch(url, {
                method: "PUT",
                body: file,
                mode: "cors",
            }).then(resp => {
                observer.next(resp.ok && resp.status === 201);
                observer.complete();
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    Delete(url) {
        return new Observable(observer => {
            fetch(url, {
                method: "DELETE",
                mode: "cors",
            }).then(resp => {
                observer.next(resp.ok && resp.status === 204);
                observer.complete();
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    Move(srcUrl, dstUrl) {
        return new Observable(observer => {
            fetch(srcUrl, {
                method: "MOVE",
                headers: {
                    "Destination": dstUrl,
                },
                mode: "cors",
            }).then(resp => {
                observer.next(resp.ok && resp.status === 201);
                observer.complete();
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    Mkdir(url) {
        return new Observable(observer => {
            fetch(url, {
                method: "MKCOL",
                mode: "cors",
            }).then(resp => {
                observer.next(resp.ok && resp.status === 201);
                observer.complete();
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    Get(url) {
        return new Observable(observer => {
            fetch(url, {
                method: "GET",
                mode: "cors",
            }).then(resp => {
                resp.json().then(respObj => {
                    observer.next(respObj);
                    observer.complete();
                }).catch(err => {
                    observer.error(err);
                    observer.complete();
                });
            }).catch(err => {
                observer.error(err);
                observer.complete();
            });
        });
    }

    Open(url) {
        window.open(url);
    }
}

//# sourceMappingURL=index.js.map