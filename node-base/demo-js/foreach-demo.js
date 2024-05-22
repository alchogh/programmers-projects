const arr = [1,2,3,4,5,6]

//콜백함수가 호출되는 시점?
//객체 또는 배열에서 요소를 하나 꺼낸 다음 불리는 콜백함수
//매개변수로 그 요소를 전달하여 호출되는 콜백함수
// arr.forEach((value)=>{
//   console.log(value)
// })


//Map과 foreach의 만남
let map = new Map()
map.set(7,'seven')
map.set(9,'nine')
map.set(8,'eight')
map.forEach((value, idx)=>{
  console.log(value)
})