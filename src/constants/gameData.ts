import React from 'react';
import { Wing, Room, Quiz } from '../types';

// Illustrations
const Illustration1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { d: "M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3.375a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1-.75-.75V7.125Zm5.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1-.75-.75V7.125Z" })
  )
);
const Illustration2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { d: "M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" }),
    React.createElement("path", { fillRule: "evenodd", d: "M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3h6.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z", clipRule: "evenodd" })
  )
);
const Illustration3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { fillRule: "evenodd", d: "M5.25 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V12ZM7.5 12a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75H10.5a.75.75 0 0 1-.75-.75V12Z", clipRule: "evenodd" }),
    React.createElement("path", { fillRule: "evenodd", d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 16.508a.75.75 0 0 0 .934-.332l1.513-2.62 1.33 2.298a.75.75 0 0 0 .933.332l3.41-1.554a.75.75 0 0 0 .332-.934l-1.513-2.62 2.3-1.328a.75.75 0 0 0-.332-.934l-3.41-1.554a.75.75 0 0 0-.933.332L11.453 9.75l-2.3 1.328a.75.75 0 0 0 .332.934L13.195 13.5l-1.33-2.298a.75.75 0 0 0-.933-.332L7.52 12.422a.75.75 0 0 0-.332.934l1.513 2.62-2.3 1.328a.75.75 0 0 0 .332.934l3.242 1.474Z", clipRule: "evenodd" })
  )
);
const Illustration4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { d: "M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" }),
    React.createElement("path", { fillRule: "evenodd", d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.25 11.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm.75 2.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm.75-2.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm.75-5.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm-5.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z", clipRule: "evenodd" })
  )
);
const Illustration5: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement("svg", { ...props, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor" },
    React.createElement("path", { fillRule: "evenodd", d: "M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3A5.25 5.25 0 0 0 12 1.5ZM8.25 9.75v-.75a3.75 3.75 0 1 1 7.5 0v.75h-7.5Z", clipRule: "evenodd" })
  )
);
const Illustrations = [Illustration1, Illustration2, Illustration3, Illustration4, Illustration5];

const allQuizzes: Quiz[] = [
  {
    scenario: "안전장비 구매 계약의 입찰 업체 중 한 곳의 대표가 당신의 4촌 이내 친족임을 알게 되었습니다. 당신은 계약업체 선정 과정에 직접적인 영향력을 행사할 수 있는 위치에 있습니다.",
    question: "이 상황에서 가장 먼저 해야 할 일은 무엇입니까?",
    options: [
      "친족에게 연락하여 입찰을 포기하도록 권유한다.",
      "공정한 심사를 할 것이므로 아무런 조치를 취하지 않는다.",
      "소속 기관장에게 해당 사실을 서면으로 신고하고, 직무 회피를 신청한다.",
      "동료에게만 구두로 상황을 알리고 조언을 구한다."
    ],
    correctAnswerIndex: 2,
    explanation: "행동강령 제6조(사적 이해관계의 신고 등)에 따라, 임직원은 직무관련자가 4촌 이내의 친족인 경우 그 사실을 소속 기관의 장에게 서면으로 신고해야 합니다. 공정한 직무수행을 위해 회피 신청을 하는 것이 원칙입니다.",
    hint: "개인적인 판단보다는 공식적인 신고 및 회피 절차를 따르는 것이 중요합니다."
  },
  {
    scenario: "1년 전 퇴직한 선배가 현재 직무관련자인 건설사의 자문위원으로 일하고 있습니다. 그 선배가 업무 협의를 명목으로 저녁 식사를 제안했습니다.",
    question: "이 상황에서 가장 올바른 행동은 무엇입니까?",
    options: [
      "업무 관련 논의이므로, 사적인 식사 자리에서 자유롭게 논의한다.",
      "퇴직한 지 2년이 지나지 않은 직무관련자와의 사적 접촉이므로, 소속 기관장에게 신고 후 공식 절차에 따라 처리한다.",
      "선배와의 관계를 고려하여 식사는 하지만, 업무 이야기는 하지 않는다.",
      "신고는 과한 조치이므로, 동료와 함께 만나는 것으로 문제를 해결한다."
    ],
    correctAnswerIndex: 1,
    explanation: "행동강령 제16조의2(퇴직자와의 사적 접촉 신고)에 따라, 임직원은 직무관련자인 소속 기관의 퇴직자(퇴직 후 2년 미만)와 사적 접촉을 할 경우 소속 기관의 장에게 신고해야 합니다.",
    hint: "퇴직 후 2년이 지나지 않은 직무관련자와의 사적 만남은 신고 대상이 될 수 있음을 기억하세요."
  },
  {
    scenario: "재정지원 사업 심사 중, 심사 대상 업체 대표가 '고생이 많으시다'며 5만원 상당의 선물 교환권을 놓고 갔습니다.",
    question: "이 상황에서 당신이 취해야 할 행동으로 가장 적절한 것은?",
    options: [
      "사회상규상 허용되는 금액이므로 받고, 공정하게 심사한다.",
      "즉시 거절 또는 반환하고, 소속 기관장에게 서면으로 신고한다.",
      "선물은 받지만, 심사에 영향을 주지 않겠다고 다짐한다.",
      "나중에 비슷한 가격의 답례품을 전달하여 문제를 상쇄한다."
    ],
    correctAnswerIndex: 1,
    explanation: "행동강령 제19조(금품등의 수수 금지)에 따라 임직원은 직무와 관련하여 대가성 여부를 불문하고 금품등을 받아서는 안 됩니다. 즉시 거절 또는 반환하고 신고하는 것이 원칙입니다.",
    hint: "직무와 관련해서는 소액이라도 금품을 받아서는 안 된다는 원칙을 기억하세요."
  },
  {
    scenario: "신규 안전 교육 프로그램 도입 업무를 담당하던 중, 한 유력 후보 업체 대표가 '계약하게 되면, 퇴직 후 우리 회사 고문으로 모시고 싶다'는 말을 했습니다.",
    question: "이 제안은 행동강령상 어떤 문제가 있습니까?",
    options: [
      "아직 퇴직 전이고 구두 제안이므로 아무런 문제가 없다.",
      "이해관계자에게 장래의 고용을 약속받는 행위는 '사적 이해관계'에 해당하여 신고해야 한다.",
      "단순한 덕담이므로, 마음에 담아두지 않고 넘어가면 된다.",
      "고용 약속은 서면으로만 효력이 있으므로 괜찮다."
    ],
    correctAnswerIndex: 1,
    explanation: "직무관련자로부터 퇴직 후 고용 약속과 같은 이익을 제공받는 것은 공정한 직무수행을 저해할 수 있는 사적 이해관계에 해당할 수 있습니다(행동강령 제6조). 이를 인지한 즉시 소속기관장에게 신고해야 합니다.",
    hint: "미래의 불확실한 약속이라도 현재 직무의 공정성에 영향을 줄 수 있다면 신고 대상이 될 수 있습니다."
  },
    {
    scenario: "당신은 계약업무 담당자입니다. 당신의 가족이 운영하는 회사가 공단과 물품 수의계약을 체결하려고 합니다.",
    question: "이 상황에서 올바른 행동은 무엇입니까?",
    options: [
      "가족 회사라도 가장 좋은 조건을 제시하면 계약할 수 있다.",
      "다른 직원에게 계약 업무를 맡기면 문제가 없다.",
      "가족 또는 특수관계사업자와의 수의계약은 제한되므로 체결해서는 안 된다.",
      "계약 금액이 소액이라면 문제가 되지 않는다."
    ],
    correctAnswerIndex: 2,
    explanation: "행동강령 제6조의6(수의계약 체결 제한)에 따라, 계약업무를 담당하는 직원은 자신의 가족이 그 기관과 수의계약을 체결하도록 해서는 안 됩니다.",
    hint: "가족과의 수의계약은 대표적인 이해충돌 사례입니다."
  },
  {
    scenario: "상급자가 법령에 위반되는 부당한 지시를 했습니다. 당신은 그 지시가 공정한 직무수행을 현저하게 해친다고 판단했습니다.",
    question: "부당한 지시에 대해서는 그 사유를 상급자에게 소명하고 따르지 않을 수 있다.",
    options: ["O (맞다)", "X (아니다)"],
    correctAnswerIndex: 0,
    explanation: "행동강령 제5조(공정한 직무수행을 해치는 지시 등에 대한 처리)에 따라, 임직원은 부당한 지시에 대해 그 사유를 상급자에게 소명하고 지시에 따르지 않거나 행동강령책임자와 상담할 수 있습니다.",
    hint: "부당한 지시는 거부할 권리가 있습니다."
  },
  {
    scenario: "출장 중 발생한 업무추진비를 아껴, 남은 금액으로 개인적인 기념품을 구매했습니다.",
    question: "업무추진비 등 예산을 목적 외의 용도로 사용하는 것은 행동강령 위반이다.",
    options: ["O (맞다)", "X (아니다)"],
    correctAnswerIndex: 0,
    explanation: "행동강령 제8조(예산의 목적 외 사용 금지)에 따라, 임직원은 업무수행을 위한 예산을 목적 외의 용도로 사용하여 공단에 재산상 손해를 가해서는 안 됩니다.",
    hint: "예산은 지정된 목적으로만 사용해야 합니다."
  },
  {
    scenario: "친한 동료의 승진을 돕기 위해, 인사 담당자에게 그 동료를 잘 봐달라고 청탁했습니다.",
    question: "자신의 인사가 아니므로, 동료를 위해 인사 청탁을 하는 것은 허용된다.",
    options: ["O (맞다)", "X (아니다)"],
    correctAnswerIndex: 1,
    explanation: "행동강령 제10조(인사 청탁 등 금지)에 따라, 임직원은 직위를 이용하여 다른 임직원의 인사에 부당하게 개입해서는 안 됩니다.",
    hint: "타인을 위한 청탁도 금지 대상입니다."
  },
  {
    scenario: "직무수행 중 알게 된 미공개 정보를 이용하여, 관련된 회사의 주식을 구매했습니다.",
    question: "직무관련 정보를 이용한 재산상 거래나 투자는 금지된다.",
    options: ["O (맞다)", "X (아니다)"],
    correctAnswerIndex: 0,
    explanation: "행동강령 제17조(직무관련 정보를 이용한 거래 등의 제한)에 따라, 임직원은 직무수행 중 알게 된 정보를 이용하여 재산상 거래나 투자를 해서는 안 됩니다.",
    hint: "미공개 정보 이용은 심각한 위반 행위입니다."
  },
  {
    scenario: "업무용 차량을 주말에 개인적인 용무(가족 여행)를 위해 사용했습니다.",
    question: "업무용 차량 등 공단 재산을 사적인 용도로 사용하는 것은 행동강령 위반이다.",
    options: ["O (맞다)", "X (아니다)"],
    correctAnswerIndex: 0,
    explanation: "행동강령 제18조(공단 재산의 사적사용·수익 금지)에 따라, 임직원은 공단 소유재산을 정당한 사유 없이 사적인 용도로 사용·수익하여서는 안 됩니다.",
    hint: "공단의 재산은 공적인 목적으로만 사용해야 합니다."
  }
];

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const shuffledQuizzes = shuffleArray(allQuizzes);

const rooms: Room[] = shuffledQuizzes.map((quiz, index) => ({
  title: `제${index + 1}호실: ${quiz.question.startsWith("이 상황에서") ? "선택의 순간" : "진실의 거울"}`,
  description: `미궁의 ${index + 1}번째 방에 도착했습니다. 문이 닫히자 새로운 도전과제가 눈앞에 나타납니다.`,
  quiz,
  transition: {
    narrative: `이전 방의 문이 스르륵 열리며, 다음 방으로 향하는 길이 나타납니다. ${index + 1}번째 시련이 당신을 기다립니다.`,
    illustration: Illustrations[index % Illustrations.length],
  },
}));

export const WINGS: Wing[] = [
  {
    title: "청렴의 미궁",
    rooms: rooms,
  }
];