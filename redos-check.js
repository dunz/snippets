function measureExecutionTime(regex, email, iterations) {
  const start = process.hrtime.bigint() // 시작 시간

  for (let i = 0; i < iterations; i++) {
    regex.test(email)
  }

  const end = process.hrtime.bigint() // 종료 시간
  return (end - start) / BigInt(iterations) // 평균 실행 시간 반환
}

// 복잡성이 증가된 정규 표현식 (취약한 정규 표현식 예시)
// const vulnerableRegex = /^(a+)+@example.com$/
const vulnerableRegex = /(\b(https?|ftp|file):\/\/\S+\b|\b(\S+\.\S+)\b)/g

// 개선된 정규 표현식 (단순화된 예시)
// const improvedRegex = /^a+@example.com$/
const improvedRegex = /\b(?:https?|ftp|file):\/\/\w+\.\w+\.\S+\b/g

// 악의적인 입력 예시 (복잡성을 유발하는 입력)
const maliciousEmail = 'a'.repeat(20) + '!@example.com'
// '!'는 정규 표현식에 맞지 않아 빠르게 실패할 것입니다.
// 이는 입력 문자열이 정규 표현식과 일치하지 않을 때, 정규 표현식 엔진이 불필요한 추가적인 처리 없이 빠르게 작업을 종료할 수 있다는 점을 보여줍니다.
// 다만, 특정 정규 표현식 구조에서는 (예를 들어, 과도한 backtracking을 유발하는 패턴) 비록 일치하지 않는 문자열이라도
// 처리에 상당한 시간이 소요될 수 있으며, 이러한 경우는 성능 저하나 ReDoS 취약성으로 이어질 수 있습니다.

const iterations = 10 // 반복 횟수는 실행 시간이 길어질 수 있으므로 줄임

const vulnerableTime = measureExecutionTime(vulnerableRegex, maliciousEmail, iterations)
const improvedTime = measureExecutionTime(improvedRegex, maliciousEmail, iterations)

console.log(`취약한 정규 표현식 실행 시간: ${vulnerableTime.toString()} 나노초`)
console.log(`개선된 정규 표현식 실행 시간: ${improvedTime.toString()} 나노초`)
