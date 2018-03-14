# Webdav client based on FetchAPI

## Angular
### Usage
```typescript
export class WebdavComponent implements OnInit {
  @ViewChild("fileInput") fileInput;
  wd: WebDav;

  constructor() {
  }

  ngOnInit() {
    this.wd = new WebDav();
  }

  Propfind() {
    this.wd.Propfind("http://localhost:8080/fs/", 1).subscribe((wdpArray) => {
      console.log(wdpArray);
    }, err => {
      console.log(err);
    });
  }

  Upload() {
    const files = this.fileInput.nativeElement.files;
    for (let i = 0; i < files.length; i++) {
      this.wd.Upload("http://localhost:8080/fs/" + files[i].name + "/", files[i]).subscribe(ok => {
        console.log(ok);
      });
    }
  }

  Open() {
    this.wd.Open("http://localhost:8080/fs/file");
  }

  Delete() {
    this.wd.Delete("http://localhost:8080/fs/file").subscribe(ok => {
      console.log(ok);
    });
  }

  Mkdir() {
    this.wd.Mkdir("http://localhost:8080/fs/folder/").subscribe(ok => {
      console.log(ok);
    });
  }

  Move() {
    this.wd.Move("http://localhost:8080/fs/file", "http://localhost:8080/fs/folder/file").subscribe(ok => {
      console.log(ok);
    });
  }
}
```