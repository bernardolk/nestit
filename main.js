



let names_dataset = [{ name: 'john', surname: 'locke', gender: 'male', age: 21 },
{ name: 'marlenne', surname: 'ferrari', gender: 'female', age: 25 },
{ name: 'maxwell', surname: 'locke', gender: 'male', age: 80 },
{ name: 'nikola', surname: 'tesla', gender: 'male', age: 43 },
{ name: 'kurt', surname: 'cobain', gender: 'male', age: 27 },
{ name: 'nikita', surname: 'locke', gender: 'female', age: 44 }]

class Nestit {
   constructor(arr) {
      this.Array = arr;
   }
}

Nestit.prototype.by = function (key, label) {
   if (this === null) {
      throw new TypeError('this is null or not defined.');
   }

   let O = Object(this.Array);
   let len = O.length >>> 0;

   let result = [];

   let j = 0, check_value = 0, check_key = 0, check_label = 0;
   while (j < len) {
      if ('values' in O[j] && Array.isArray(O[j]['values']))
         check_value++;
      if ('key' in O[j] && typeof O[j]['key'] === "string")
         check_key++;
      if ('label' in O[j] && typeof O[j]['label'] === "string")
         check_label++;
      j++;
   }

   if (check_value > 0 && check_value < len)
      throw new "Not all objects in array have 'values' key or contains 'values' as an non-array object.";


   if (check_key > 0 && check_key < len)
      throw new "Not all objects in array have 'key' key or contains 'key' as an non-string object.";

   if (check_label > 0 && check_label < len)
      throw new "Not all objects in array have 'label' key or contains 'label' as an non-string object.";

   if (!label) {
      label = key;
   }

   if (check_value > 0) {
      let k = 0
      while (k < len) {
         result.push(O[k]);
         let r_ind = result.length - 1;
         if (k in O) {
            let arr = Array.from(O[k]['values']);
            let nest = new Nestit(arr);
            let nested = nest.by(key, label);
            result[r_ind]['values'] = nested.Array;
         }
         k++;
      }
   }
   else {

      let k = 0
      let memo = [];
      while (k < len) {
         if (k in O) {
            let kobject = O[k];
            let value = kobject[key];
            let memo_index = memo.indexOf(value);
            let ind = memo_index;
            if (memo_index === -1) {
               memo.push(value);
               ind = memo.length - 1;
               result[ind] = {}
               result[ind]['key'] = value;
               result[ind]['label'] = label;
               result[ind]['values'] = [];
            }
            result[ind]['values'].push(kobject);
         }
         k++
      }
   }

   return new Nestit(result);
}


Nestit.prototype.sum = function (field) {
   if (this === null) {
      throw new TypeError('this is null or not defined.');
   }

   let O = Object(this.Array);
   let len = O.length >>> 0;

   let result = [];

   let j = 0, check_value = 0, check_key = 0, check_label = 0;
   while (j < len) {
      if ('values' in O[j] && Array.isArray(O[j]['values']))
         check_value++;
      if ('key' in O[j] && typeof O[j]['key'] === "string")
         check_key++;
      if ('label' in O[j] && typeof O[j]['label'] === "string")
         check_label++;
      j++;
   }

   if (check_value > 0 && check_value < len)
      throw new "Not all objects in array have 'values' key or contains 'values' as an non-array object.";


   if (check_key > 0 && check_key < len)
      throw new "Not all objects in array have 'key' key or contains 'key' as an non-string object.";

   if (check_label > 0 && check_label < len)
      throw new "Not all objects in array have 'label' key or contains 'label' as an non-string object.";


   if (check_value > 0) {
      let k = 0
      while (k < len) {
         if (k in O) {
            let arr = Array.from(O[k]['values']);
            let acc_sum = new Nestit(arr).sum(field);
            if(acc_sum instanceof Nestit){
               let res = O[k];
               O[k].values = acc_sum.Array;
               result.push(res);
            }
            else{
               result.push({... O[k], sum: {over: field, value: acc_sum }});
            }
         }
         k++;
      }

      return new Nestit(result);
   }
   else {
      let k = 0
      let acc = 0;
      while (k < len) {
         if (k in O) {
            let kobject = O[k];
            if (field in kobject) {
               acc += kobject[field];
            }
         }
         k++
      }

      return acc;
   }
}

// let test = new Nestit(names_dataset);
// let jjj = test.by('surname');
// let testtwo = new Nestit(names_dataset).by('surname', 'surname');
// let testthree = testtwo.by('gender', 'label');

// let data = new Nestit(names_dataset)
//    .by('surname')
//    .by('gender')
//    .Array;

// for (bysurname of data) {
//    let bysurname_values = bysurname.values;
//    for (bygender of bysurname_values) {
//       let bygender_values = bygender.values;
//       for (value of bygender_values)
//          console.log(`${value.name} is a ${value.gender} of the family ${value.surname}`);
//    }
// }


let bysurnamewithage = new Nestit(names_dataset)
   .by('surname')
   .sum('age')
   .by('gender')
   .sum('age')
   .Array;

let j = 0;






