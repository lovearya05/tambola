class Node {
  constructor() {
    this.A = Array.from({ length: 3 }, () => Array(9).fill(0));
  }

  getRowCount(r) {
    return this.A[r].filter(num => num !== 0).length;
  }

  getColCount(c) {
    return this.A.map(row => row[c]).filter(num => num !== 0).length;
  }

  getEmptyCellInCol(c) {
    for (let i = 0; i < 3; i++) {
      if (this.A[i][c] === 0) {
        return i;
      }
    }
    return -1;
  }

  sortColumnWithThreeNumbers(c) {
    const emptyCell = this.getEmptyCellInCol(c);
    if (emptyCell !== -1) {
      throw new Error("Hey! your column has <3 cells filled, invalid function called");
    }

    const tempArr = [this.A[0][c], this.A[1][c], this.A[2][c]].sort((a, b) => a - b);

    for (let r = 0; r < 3; r++) {
      this.A[r][c] = tempArr[r];
    }
  }

  sortColumnWithTwoNumbers(c) {
    const emptyCell = this.getEmptyCellInCol(c);
    if (emptyCell === -1) {
      throw new Error("Hey! your column has 3 cells filled, invalid function called");
    }

    const [cell1, cell2] = emptyCell === 0 ? [1, 2] : (emptyCell === 1 ? [0, 2] : [0, 1]);

    if (this.A[cell1][c] < this.A[cell2][c]) {
      return;
    } else {
      // swap
      [this.A[cell1][c], this.A[cell2][c]] = [this.A[cell2][c], this.A[cell1][c]];
    }
  }

  sortColumn(c) {
    if (this.getColCount(c) === 1) {
      return;
    } else if (this.getColCount(c) === 2) {
      this.sortColumnWithTwoNumbers(c);
    } else {
      this.sortColumnWithThreeNumbers(c);
    }
  }

  sortColumns() {
    for (let c = 0; c < 9; c++) {
      this.sortColumn(c);
    }
  }
}

function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNumberOfElementsInSet(set) {
  return set.reduce((count, li) => count + li.length, 0);
}

function main() {
  const nodes = Array.from({ length: 6 }, () => new Node());

  const columns = Array.from({ length: 9 }, (_, i) => Array.from({ length: 10 }, (_, j) => i * 10 + j + 1));

  const sets = Array.from({ length: 6 }, () => Array.from({ length: 9 }, () => Array()));

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 6; j++) {
      const randNumIndex = getRand(0, columns[i].length - 1);
      const randNum = columns[i].splice(randNumIndex, 1)[0];

      sets[j][i].push(randNum);
    }
  }

  const lastCol = columns[8];
  const randNumIndex = getRand(0, lastCol.length - 1);
  const randNum = lastCol.splice(randNumIndex, 1)[0];

  const randSetIndex = getRand(0, sets.length - 1);
  const randSet = sets[randSetIndex][8];
  randSet.push(randNum);

  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i < 9; i++) {
      const col = columns[i];
      if (col.length === 0) continue;

      const randNumIndex_p = getRand(0, col.length - 1);
      const randNum_p = col[randNumIndex_p];

      let vacantSetFound = false;
      while (!vacantSetFound) {
        const randSetIndex_p = getRand(0, sets.length - 1);
        const randSet_p = sets[randSetIndex_p];

        if (getNumberOfElementsInSet(randSet_p) === 15 || randSet_p[i].length === 2) continue;

        vacantSetFound = true;
        randSet_p[i].push(randNum_p);

        col.splice(randNumIndex_p, 1);
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    const col = columns[i];
    if (col.length === 0) continue;

    const randNumIndex_p = getRand(0, col.length - 1);
    const randNum_p = col[randNumIndex_p];

    let vacantSetFound = false;
    while (!vacantSetFound) {
      const randSetIndex_p = getRand(0, sets.length - 1);
      const randSet_p = sets[randSetIndex_p];

      if (getNumberOfElementsInSet(randSet_p) === 15 || randSet_p[i].length === 3) continue;

      vacantSetFound = true;
      randSet_p[i].push(randNum_p);

      col.splice(randNumIndex_p, 1);
    }
  }

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 9; j++) {
      sets[i][j].sort((a, b) => a - b);
    }
  }

  for (let setIndex = 0; setIndex < 6; setIndex++) {
    const currSet = sets[setIndex];
    const currTicket = nodes[setIndex];

    for (let size = 3; size > 0; size--) {
      if (currTicket.getRowCount(0) === 5) break;
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (currTicket.getRowCount(0) === 5) break;
        if (currTicket.A[0][colIndex] !== 0) continue;

        const currSetCol = currSet[colIndex];
        if (currSetCol.length !== size) continue;

        currTicket.A[0][colIndex] = currSetCol.shift();
      }
    }

    for (let size = 2; size > 0; size--) {
      if (currTicket.getRowCount(1) === 5) break;
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (currTicket.getRowCount(1) === 5) break;
        if (currTicket.A[1][colIndex] !== 0) continue;

        const currSetCol = currSet[colIndex];
        if (currSetCol.length !== size) continue;

        currTicket.A[1][colIndex] = currSetCol.shift();
      }
    }

    for (let size = 1; size > 0; size--) {
      if (currTicket.getRowCount(2) === 5) break;
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        if (currTicket.getRowCount(2) === 5) break;
        if (currTicket.A[2][colIndex] !== 0) continue;

        const currSetCol = currSet[colIndex];
        if (currSetCol.length !== size) continue;

        currTicket.A[2][colIndex] = currSetCol.shift();
      }
    }
  }

  try {
    for (let i = 0; i < 6; i++) {
      nodes[i].sortColumns();
    }
  } catch (e) {
    console.log(
      "Note: there is a small probability your columns may not be sorted, it should not impact the gameplay"
    );
    console.log("Please create an issue in the GitHub for investigation");
    console.log(e.message);
  }

  const ans = new Object()
  for (let i = 0; i < 6; i++) {
    const currTicket = nodes[i];
    ans['1'+(i+1)] = currTicket?.A

    // console.log(currTicket) //////////

    if (i !== 5) {
      console.log();
      console.log();
      console.log();
    }
  }

  return ans

}

module.exports= function () {
    // return "Hello World"
    return main();
}