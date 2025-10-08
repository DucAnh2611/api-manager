import CliTable3 from 'cli-table3';

export const printAppTable = <T>(
  list: T[],
  fields: Array<[keyof T, string] | keyof T>,
  slideStr: Array<keyof T> = []
) => {
  const table = new CliTable3({
    head: fields.map((f) => (typeof f === 'object' ? f[1] : String(f))),
    style: { compact: true },
    wordWrap: true,
  });

  for (const item of list) {
    table.push(
      fields.map((f) => {
        const fieldString = typeof f === 'object' ? f[0] : f;
        let strData = String(item[fieldString]) ?? '';

        if (!slideStr.includes(fieldString)) return strData;

        return f !== 'Id' && strData.length > 20 ? `${strData.slice(0, 20)}...` : strData;
      })
    );
  }

  console.log(table.toString());
};
