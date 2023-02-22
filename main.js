// Input element
const fileInput = document.getElementById('fileInput');

// Event listener to the file input element
fileInput.addEventListener('change', (event) => {
  // The selected file
  const file = event.target.files[0];

  // Creating a new FileReader object
  const reader = new FileReader();

  // I am adding an event listener 
  reader.addEventListener('load', (event) => {
    const arrayBuffer = event.target.result;

    // New workbook object 
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // First worksheet in the workbook
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Getting each column
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const column1Range = range.e.c + 1; 
    const column2Range = column1Range + 1;
    const column3Range = column2Range + 1;
    const column4Range = column3Range + 1;

    // Converting columns to arrays
    const column1 = [];
    const column2 = [];
    const column3 = [];
    const column4 = [];

    for (let i = 1; i <= range.e.r; i++) {
      column1.push(worksheet[XLSX.utils.encode_cell({ c: 0, r: i })]?.w);
      column2.push(worksheet[XLSX.utils.encode_cell({ c: 1, r: i })]?.w);
      column3.push(worksheet[XLSX.utils.encode_cell({ c: 2, r: i })]?.w);
      column4.push(worksheet[XLSX.utils.encode_cell({ c: 3, r: i })]?.w);
    }

    // Here we are calculating the sum of each array
    const sum1 = column1.reduce((total, num) => total + parseFloat(num || 0), 0);
    const sum2 = column2.reduce((total, num) => total + parseFloat(num || 0), 0);
    const sum3 = column3.reduce((total, num) => total + parseFloat(num || 0), 0);
    const sum4 = column4.reduce((total, num) => total + parseFloat(num || 0), 0);

    // Making another array with the sums of each column
    const sums = [sum1, sum2, sum3, sum4];

    // Calculating the total sum of all 4 columns 
    const totalSum = sums.reduce((acc, curr) => acc + curr, 0);

    // Answers to the console
    console.log("Column_1", column1);
    console.log("Column_2", column2);
    console.log("Column_3", column3);
    console.log("Column_4", column4);
    console.log("Sums", sums);
    console.log("Total Sum", totalSum);
      });
      reader.readAsArrayBuffer(file);
});

