import {Observable} from "rxjs/Observable";

export declare class WebDavPath {
    Name: string;
    Href: string;
    ContentType: string;
    ContentLengeth: number;
    LastModified: string;
    Etag: string;
    Status: string;
    IsDir: boolean;
}

export declare class WebDav {
    ParserXML: DOMParser;
    ns: string;

    constructor();

    ParseWebDavPathFromXML(stringXML: string): Array<WebDavPath>;

    Propfind(url: string, depth: number): Observable<Array<WebDavPath>>;

    Upload(url: string, file: File): Observable<boolean>;

    Delete(url: string): Observable<boolean>;

    Move(srcUrl: string, dstUrl: string): Observable<boolean>;

    Mkdir(url: string): Observable<boolean>;

    Get(url: string): Observable<any>;

    Open(url: string): void;
}
