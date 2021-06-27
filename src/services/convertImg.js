// async function parseURI(d) {
//   const reader = new FileReader();
//   reader.readAsDataURL(d);
//   return new Promise((res, rej) => {
//     reader.onload = (e) => {
//       // console.log(e);
//       res(reader.result);
//     };
//   });
// }

export function convertFileToBase64(file) {
  const result = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      console.error(error);
      reject(error);
    };
  });

  return result;
}

// export async function getDataBlob(url) {
//   let res = await fetch(url);
//   let blob = await res.blob();
//   let uri = await parseURI(blob);
//   return uri;
// }
