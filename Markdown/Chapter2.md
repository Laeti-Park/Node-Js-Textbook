## ES2015+
### const, let
- const : 고정된 값 할당할 시 사용
- let : 다른 값을 할당하는 상황이 생길 경우 사용

### 템플릿 문자열
- (`)백틱으로 감싸며 문자열 안에 ${변수}를 넣을 수 있음
  - `${num1} + ${num2} = ${result2} 입니다.`

### 객체 리터럴
- 속성명과 변수명이 동일한 경우 한 번만 써도 괜찮음
- 객체의 속성명은 동적으로 생성 가능

``` javascript
var sayNode = function () {
    console.log('Node');
};
var es = 'ES';
var oldObject = {
    sayJS: function () {
        console.log('JS');
    },
    sayNode: sayNode
};
oldObject[es + 6] = 'Fantastic';
oldObject.sayNode(); // Node
oldObject.sayJS(); // JS
console.log(oldObject.ES6); // Fantastic
```

``` javascript
const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
};
newObject.sayNode(); // Node
newObject.sayJS(); // JS
console.log(newObject.ES6); // Fantastic
```

### 화살표 함수
- 기존의 function() {}을 대신할 수 있는 함수 기능
- 변수를 대입하면 나중에 재사용 가능
```javascript
// 화살표 함수 없음
function add1(x, y) {
    return x + y;
}

// 화살표 함수 형태 1
const add2 = (x, y) => {
    return x + y;
};

// 화살표 함수 형태 2
const add3 = (x, y) => x + y; // return할 식

// 화살표 함수 형태 3
const add4 = (x, y) => (x + y);
```

```javascript
// 화살표 함수 없음
var relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function () {
        var that = this;
        this.friends.forEach(function (friend) {
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();

// 화살표 함수 형태
const relationship2 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();
```

### 구조분해 할당
- 객체와 배열로부터 속성이나 요소를 꺼낼 수 있음
```javascript
var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function () {
        this.status.count--;
        return this.status.count;
    },
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
```

- candyMachine 객체 안의 속성을 찾아 변수와 매칭
- count 처럼 여러 단계 안의 속성을 찾을 수 있음
- 구조분해 할당을 사용할 시 값을 가져오기 때문에 함수의 this가 달라짐
  - 달라진 this를 원래대로 바꿔주려면 bind 함수를 함께 사용해주어야 한다.
```javascript
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy () {
        this.status.count--;
        return this.status.count;
    },
};
const { getCandy, status: { count } } = candyMachine;
```

- 배열에 대한 구조분해 할당 문법
```javascript
var array = ['nodejs', {}, 10, true];
var node = array[0];
var obj = array[1];
var bool = array[3];
```

```javascript
const array = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array;
```

### 클래스
- 클래스 문법이 추가
- 프로토타입 상속 코드
  - Human 생성자 함수와 Zero 생성자 함수
  - Zero 생성자 함수가 Human 생성자 함수 상속(Human.apply, Object.create)
```javascript
var Human = function(type) {
    this.type = type || 'human';
};

Human.isHuman = function(human) {
    return human instanceof Human;
};

Human.prototype.breathe = function() {
    alert('h-a-a-a-m');
};

var Zero = function(type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
};

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero; // 상속 부분
Zero.prototype.sayName = function() {
    alert(this.firstName + ' ' + this.lastName);
};

var oldZero = new Zero('human', 'Zero' 'Cho');
Human.isHuman(oldZero); // true
```

- 클래스 기반 코드
  - 클래스 기반으로 동작하는 것이 아닌 프로토타입 기반으로 동작
```javascript
class Human {
    constructor(type = 'human') {
        this.type = type;
    }

    static isHuman(human) {
        return human instanceof Human;
    }
    
    breathe() {
        alert('h-a-a-a-m');
    }
}

class Zero extends Human {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName() {
        super.breathe();
        alert(`${this.firstName} ${this.lastName}`);
    }
};

const newZero = new Zero('human', 'Zero' 'Cho');
Human.isHuman(newZero); // true
```

### 프로미스
- 노드의 API들이 콜백 대신 프로미스(Promise) 기반으로 재구성
  - 콜백 지옥(Callback Hell) 현상을 극복
- 실행을 바로 하되 결괏값은 나중에 받는 객체
  - new Promise로 생성, resolve와 reject를 매개변수로 갖는 콜백 함수 작성
  - resolve 시 then이 실행, reject 시 catch가 실행
  - finally는 성공 여부 관계없이 실행
```javascript
const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});
// 다른 코드가 들어갈 수 있음
promise
    .then((message) => {
        console.log(message); // 성공(resolve)한 경우 실행
    })
    .catch((error) => {
        console.error(error); // 실패(reject)한 경우 실행
    })
    .finally(() => { // 끝나고 무조건 실행
        console.log('무조건');
    });
```

- message를 resolve하면 다음 then에서 message2로 받을 수 있음
- message2를 resolve
```javascript
promise
    .then((message) => {
        return new Promise((resolve, reject) => {
            resolve(message);
        });
    })
    .then((message2) => {
        return new Promise((resolve, reject) => {
            resolve(message2);
        });
    })
    .then((message3) => {
        return new Promise((resolve, reject) => {
            resolve(message3);
        });
    })
    .catch((error) => {
        console.error(error); // 실패(reject)한 경우 실행
    });
```

- then에서 new Promise를 return 해야 다음 message로 이동 가능
```javascript
promise
    .then((message) => {
        return new Promise((resolve, reject) => {
            resolve(message);
        });
    })
    .then((message2) => {
        return new Promise((resolve, reject) => {
            resolve(message2);
        });
    })
    .then((message3) => {
        return new Promise((resolve, reject) => {
            resolve(message3);
        });
    })
    .catch((error) => {
        console.error(error); // 실패(reject)한 경우 실행
    });
```

- 콜백을 여러 번 중첩해서 사용하기 위해 Promise.all을 사용
  - 모두 resolve될 때까지 기다렸다가 then으로 넘어감
  - 중간에 reject될 시 catch로 넘어감
```javascript
const promise1 = Pormise.resolve('성공1');
const promise1 = Pormise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });
```


### async/await
- 중첩되는 콜백 함수를 사용하는 코드를 깔끔하게 줄일 수 있음
```javascript
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            ...
        })
        catch(err => {
            console.error(err);
        })
}
```

```javascript
async funcion findAndSaveUser(Users) {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    ...
}
```

## 프런트엔드 자바스크립트

### AJAX(Asynchronous Javascript And XML)
- 페이지 이동 없이 서버에 요청을 보내고 응답 받는 기술
- HTML 파일을 하나 만들고 그 안에 script 태그를 추가
```html
<!-- axios : AJAX 요청하는 라이브러리 -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    // GET 요청
    (async () => {
        try {
            const result = await axios.get('인수로 요청을 보낼 주소');
            console.log(result);
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    })();
    
    // POST 요청
    (async () => {
        try {
            const result = await axios.post('데이터를 보낼 서버 주소', {
                name: 'zerocho',
                birth: 1994,
            });
            console.log(result);
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    })();
</script>
```

### FormData
- HTML form 태그의 데이터를 동적으로 제어할 수 있는 기능
```javascript
const formData = new FormData();
formData.append('키', '값'); // 키-값 추가
formData.delete('키'); // 해당 키 삭제
formData.set('키', '값'); // 해당 키의 값 설정
formData.has('키'); // 키가 있는 지 확인
formData.get('키'); // 해당 키의 값 하나를 불러옴
formData.getAll('키'); // 해당 키의 모든 값을 불러옴
```

### encodeURIComponent, decodeURIComponent
- encodeURIComponent : 한글을 %XX 형태로 변환
```javascript
encodeURIComponent('한글');
```
- decodeURIComponent : 인코딩된 문자열을 한글로 변환
```javascript
decodeURIComponent('%ED%95%9C%EA%B8%80');
```

### 데이터 속성과 dataset
- 노드를 웹 서버로 사용하는 경우 프론트엔드에 보여주지 않으면서 저장하는 곳
  - 자바스크립트로 쉽게 접근할 수 있음