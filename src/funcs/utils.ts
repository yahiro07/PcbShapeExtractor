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

  export function count<T>(ar: T[], cond: (a: T) => boolean): number {
    return ar.filter(cond).length;
  }
}

export function compareStringOrNumber(a: string | number, b: string | number) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
}

export function sortOrderBy<T>(
  proc: (arg: T) => string | number,
  method: 'asc' | 'dsc' = 'asc'
): (a: T, b: T) => number {
  if (method === 'asc') {
    return (a, b) => compareStringOrNumber(proc(a), proc(b));
  } else {
    return (a, b) => compareStringOrNumber(proc(b), proc(a));
  }
}
