/*
  Given function rand_zero_or_one() => int (0,1), make function get_random() => int(0 ~ max - 1)

    Answer) 1. With the random 0 or 1 generator, we are now able to choose randomly between two options.
            2. We can now safely say that once we divide a range into two section, we can choose one at random 
              - take a mid-point and choose left-side of the mid point if rand_zero_or_one return 0
                                            right-side of the mid point if rand_zero_or_one return 1
            3. If we do this repeatedly we can divide the range in 2^n sections and choosing one with procedure NO.2
               will make sure that each section has equal chance(1/2^n) of being picked.
            4. Using this theory, we can repeatedly
              1) divide the range(0 to max-1) by mid-point
              2) pick left or right side at random based on the returned value of rand_zero_or_one
              3) do this 62 times since a number in js is 64 bits(1 bit indicating + or -)
              4) for the given range at 62nd time pick the mid point and drop decimal points then return the int
*/

const rand_zero_or_one = () => (Math.random() > 0.5 ? 1 : 0);

const run_stat_test = (cb, rounds, ...args) => {
  const counts = {};
  for (let i = 0; i < rounds; i++) {
    let curNum = cb(...args);
    counts[curNum] = counts[curNum] ? counts[curNum] + 1 : 1;
  }

  return counts;
};

const get_random = max => {
  if (max <= 0) {
    console.log("Max too small");
    return null;
  } else if (max === 1) {
    return 0;
  } else {
    const pickMiddleRecur = (min, max, count) => {
      const decide = rand_zero_or_one();

      if (count === 0) {
        return (max + min) / 2;
      } else if (decide === 0) {
        return pickMiddleRecur(min, (max + min) / 2, count - 1);
      } else {
        return pickMiddleRecur((max + min) / 2, max, count - 1);
      }
    };

    let lastMidPoint = pickMiddleRecur(0, max, 62);

    return lastMidPoint - (lastMidPoint % 1);
  }
};

// console.log(
//   "test report for f() rand_zero_or_one: ",
//   run_stat_test(rand_zero_or_one, 100)
// );

console.log(
  "test report for f(0) get_random: ",
  run_stat_test(get_random, 1, 0)
);

console.log(
  "test report for f(1) get_random: ",
  run_stat_test(get_random, 1, 1)
);

console.log(
  "test report for f(2) get_random: ",
  run_stat_test(get_random, 2, 2)
);

console.log(
  "test report for f(1000) get_random: ",
  run_stat_test(get_random, 300, 20)
);
