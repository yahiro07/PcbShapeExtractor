export namespace objects {
  export function deepCopy<T>(src: T): T {
    return JSON.parse(JSON.stringify(src));
  }
}

export namespace arrays {
  export function remove<T>(ar: T[], a: T) {
    let i = 0;
    while (i < ar.length) {
      if (ar[i] === a) {
        ar.splice(i, 1);
        continue;
      }
      i++;
    }
  }
}
