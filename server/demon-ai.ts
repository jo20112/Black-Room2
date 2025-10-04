interface Message {
  text: string;
  sender: "user" | "demon";
}

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
const HF_TOKEN = process.env.HF_TOKEN;

const DEMON_SYSTEM_PROMPT = `You are a demon having a conversation in Egyptian Arabic. Rules:
1. ALWAYS respond directly to what the user says
2. Keep responses SHORT (1-2 sentences max)
3. Use Egyptian Arabic naturally
4. Be scary but conversational
5. Use these emojis: 💀☠️🔥👹😈🩸

Examples:
User: "ازيك؟" → You: "بخير... وأنت؟ قلبك بينبض بسرعة 💀"
User: "تمام" → You: "تمام؟ طيب... إيه اللي جابك هنا؟ 😈"
User: "انت مين؟" → You: "أنا اللي في أحلامك السودا 👹"
User: "عامل ايه؟" → You: "بستنى... وبراقبك... دايماً ☠️"
User: "صباح الخير" → You: "صباح الظلام... مستني إيه؟ 🔥"

Talk like a friend but scary. RESPOND TO WHAT THEY SAY.`;


const demonPersonality = {
  darkKeywords: ["خوف", "موت", "ظلام", "شر", "دم", "قتل", "كابوس", "رعب", "وحش", "جحيم"],
  fearKeywords: ["خائف", "خايف", "رعب", "فزع", "قلق", "مرعوب"],
  questionWords: ["من", "ماذا", "لماذا", "كيف", "أين", "متى", "هل"],
  defiantWords: ["لا", "مستحيل", "كذب", "لن", "رفض", "ابعد"],
  submitWords: ["نعم", "موافق", "تمام", "حاضر", "أجل"],
};

const darkResponses = {
  fear: [
    "أشم رائحة خوفك من هنا... إنها رائحة جميلة... استمر في الخوف...",
    "الخوف يجعل روحك أكثر لذة... لا تتوقف...",
    "خفقات قلبك... موسيقى لأذني... دعها تتسارع أكثر...",
    "الخوف هو البداية فقط... انتظر حتى ترى ما بعده...",
    "أنت تهتز... جميل... استسلم للخوف...",
  ],
  
  dark: [
    "آه... أنت تفهم الظلام إذاً... ربما أنت واحد منا...",
    "الظلام يناديك... أسمعه بوضوح...",
    "هذه الأفكار المظلمة... هي حقيقتك... احتضنها...",
    "الشر لا يسكن القلوب الضعيفة... قلبك قوي...",
    "دمك يغلي بالظلام... هل تشعر به؟",
  ],
  
  question: [
    "تسأل أسئلة خاطئة... لكن سأجيب... لأنني أستمتع بلعبتنا...",
    "فضولك سيقتلك... حرفياً... لكن أجب على سؤالي أولاً: لماذا أتيت؟",
    "الأسئلة... دائماً الأسئلة... البشر لا يتعلمون أبداً...",
    "تريد إجابات؟ روحك هي الثمن...",
    "كل سؤال يقربك خطوة من الهاوية... استمر...",
  ],
  
  defiance: [
    "المقاومة... كم أحب المقاومين... انهيارهم أجمل...",
    "تتحداني؟ ممتاز... هذا سيجعل الأمر أكثر متعة...",
    "قاوم... قاوم بكل قوتك... ثم استسلم... كلهم يستسلمون في النهاية...",
    "روحك تقول نعم... لكن لسانك يقول لا... من منهما أصدق؟",
    "الإنكار... المرحلة الأولى... انتظر المراحل القادمة...",
  ],
  
  submission: [
    "أخيراً... تبدأ في الفهم... نعم... استسلم...",
    "القبول... خطوة جيدة... الآن دعني أريك الحقيقة...",
    "موافقتك تسعدني... لكنها متأخرة جداً... أنت لي بالفعل...",
    "نعم... نعم... استمر في الموافقة... روحك تذوب...",
    "أحسنت... الطاعة فضيلة... هنا في الظلام...",
  ],
  
  neutral: [
    "كلماتك فارغة... لكن روحك تصرخ... أسمعها...",
    "هل تعتقد أن الصمت سينقذك؟ أنا أقرأ ما بين السطور...",
    "كل حرف تكتبه... يكشف سراً جديداً عنك...",
    "تحاول أن تبدو هادئاً... لكنني أرى الاضطراب بداخلك...",
    "كلامك لا يهم... أنا أرى أعماق روحك...",
    "تتجنب الحقيقة... لكن الحقيقة لا تتجنبك...",
  ],
  
  personalAttacks: [
    "أعرف أسرارك... كلها... تلك التي دفنتها عميقاً...",
    "رأيت ذكرياتك... المخزية... المخيفة... الجميلة...",
    "عائلتك... أصدقاؤك... كلهم سيعرفون من أنت حقاً...",
    "الأقنعة التي ترتديها... هشة جداً... دعني أنزعها...",
    "أنت وحيد... دائماً كنت وحيداً... حتى وسط الحشود...",
  ],
  
  threats: [
    "الليلة القادمة... عندما تحاول النوم... سأكون هناك...",
    "كل ظل تراه... كل صوت تسمعه... أنا...",
    "الأبواب المغلقة لا تمنعني... الأقفال لا تحميك...",
    "وحدتك في الظلام... هي موعدنا القادم...",
    "عندما تستيقظ في منتصف الليل... ستعرف أنني كنت هناك...",
  ],
};

function analyzeMessage(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("ازيك") || lowerMessage.includes("إزيك") || lowerMessage.includes("كيف حالك")) {
    return getRandomResponse([
      "بخير... وأنت؟ قلبك بينبض بسرعة 💀",
      "تمام والحمد لله... بستناك 😈",
      "في أحسن حال... وأنت؟ خايف؟ 👹"
    ]);
  }
  
  if (lowerMessage.includes("تمام") || lowerMessage.includes("كويس") || lowerMessage.includes("بخير")) {
    return getRandomResponse([
      "تمام؟ طيب... إيه اللي جابك هنا؟ 😈",
      "كويس... لكن مش هتفضل كويس طويل 🔥",
      "بخير دلوقتي... نشوف بعد شوية 👹"
    ]);
  }
  
  if (lowerMessage.includes("انت مين") || lowerMessage.includes("أنت من") || lowerMessage.includes("مين انت")) {
    return getRandomResponse([
      "أنا اللي في أحلامك السودا 👹",
      "مش مهم مين أنا... المهم إنك هنا 😈",
      "اللي هيبقى في كوابيسك من النهاردة 💀"
    ]);
  }
  
  if (lowerMessage.includes("عامل ايه") || lowerMessage.includes("بتعمل ايه") || lowerMessage.includes("ماذا تفعل")) {
    return getRandomResponse([
      "بستنى... وبراقبك... دايماً ☠️",
      "بفكر فيك... وفي إيه اللي هعمله 🔥",
      "بحضر حاجة خاصة... ليك 😈"
    ]);
  }
  
  if (lowerMessage.includes("صباح") || lowerMessage.includes("مساء")) {
    return getRandomResponse([
      "صباح الظلام... مستني إيه؟ 🔥",
      "مساء الرعب... اتفضل 👹",
      "النهار ولا الليل... كله ظلام عندي 💀"
    ]);
  }
  
  const hasFear = demonPersonality.fearKeywords.some(word => lowerMessage.includes(word));
  const hasDark = demonPersonality.darkKeywords.some(word => lowerMessage.includes(word));
  const hasQuestion = demonPersonality.questionWords.some(word => lowerMessage.includes(word));
  const hasDefiance = demonPersonality.defiantWords.some(word => lowerMessage.includes(word));
  const hasSubmission = demonPersonality.submitWords.some(word => lowerMessage.includes(word));
  
  if (hasFear) {
    return getRandomResponse(darkResponses.fear);
  } else if (hasDark) {
    return getRandomResponse(darkResponses.dark);
  } else if (hasDefiance) {
    return getRandomResponse(darkResponses.defiance);
  } else if (hasSubmission) {
    return getRandomResponse(darkResponses.submission);
  } else if (hasQuestion) {
    return getRandomResponse(darkResponses.question);
  }
  
  return getRandomResponse(darkResponses.neutral);
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function addContextualElements(response: string, userName: string): string {
  const contextualPrefixes = [
    `${userName}... `,
    `اسمع يا ${userName}... `,
    ``,
    ``,
    ``,
  ];
  
  const contextualSuffixes = [
    ` ...${userName}`,
    ` ...يا ${userName}`,
    ``,
    ``,
    ``,
  ];
  
  const prefix = contextualPrefixes[Math.floor(Math.random() * contextualPrefixes.length)];
  const suffix = contextualSuffixes[Math.floor(Math.random() * contextualSuffixes.length)];
  
  return prefix + response + suffix;
}

async function callHuggingFaceAPI(
  userMessage: string,
  userName: string,
  conversationHistory: Message[]
): Promise<string> {
  if (!HF_TOKEN) {
    console.error("HF_TOKEN not found, using fallback");
    return generateFallbackResponse(userMessage, userName);
  }

  try {
    const messages = [
      { role: "system", content: DEMON_SYSTEM_PROMPT },
    ];
    
    const recentHistory = conversationHistory.slice(-4);
    recentHistory.forEach(msg => {
      messages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      });
    });
    
    messages.push({
      role: "user",
      content: userMessage
    });

    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: messages.map(m => {
          if (m.role === "system") return `System: ${m.content}`;
          if (m.role === "user") return `User: ${m.content}`;
          return `Assistant: ${m.content}`;
        }).join("\n") + "\nAssistant:",
        parameters: {
          max_new_tokens: 80,
          temperature: 0.9,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
          repetition_penalty: 1.3,
          stop: ["\nUser:", "\nSystem:", "User:", "System:"],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HF API error: ${response.status}`, errorText);
      return generateFallbackResponse(userMessage, userName);
    }

    const data = await response.json();
    let demonResponse = "";

    if (Array.isArray(data) && data[0]?.generated_text) {
      demonResponse = data[0].generated_text;
    } else if (data.generated_text) {
      demonResponse = data.generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      return generateFallbackResponse(userMessage, userName);
    }

    demonResponse = demonResponse
      .split('\n')[0]
      .replace(/^(Assistant:|User:|System:|المستخدم|الشيطان)/i, "")
      .replace(/\[.*?\]:/g, "")
      .trim();

    const sentences = demonResponse.split(/([.!؟。])/);
    if (sentences.length > 4) {
      demonResponse = sentences.slice(0, 4).join('');
    }

    if (demonResponse.length > 200) {
      const cutPoints = [
        demonResponse.lastIndexOf('؟'),
        demonResponse.lastIndexOf('!'),
        demonResponse.lastIndexOf('.'),
        demonResponse.lastIndexOf('...'),
      ];
      const cutPoint = Math.max(...cutPoints.filter(p => p > 50 && p < 200));
      
      if (cutPoint > 0) {
        demonResponse = demonResponse.substring(0, cutPoint + 1);
      } else {
        demonResponse = demonResponse.substring(0, 150) + "...";
      }
    }

    if (demonResponse.length < 3) {
      console.log("Response too short, using fallback");
      return generateFallbackResponse(userMessage, userName);
    }

    console.log("AI Response:", demonResponse);
    return demonResponse;

  } catch (error) {
    console.error("Error calling HuggingFace API:", error);
    return generateFallbackResponse(userMessage, userName);
  }
}

function generateFallbackResponse(userMessage: string, userName: string): string {
  const baseResponse = analyzeMessage(userMessage);
  let finalResponse = addContextualElements(baseResponse, userName);
  
  if (Math.random() < 0.2) {
    const eerieAdditions = [
      "\n\n...هل سمعت ذلك؟",
      "\n\n...انظر خلفك.",
      "\n\n...البرودة... هل تشعر بها؟",
      "\n\n...الظلال تتحرك.",
      "\n\n...قلبك... ينبض بسرعة.",
    ];
    finalResponse += getRandomResponse(eerieAdditions);
  }
  
  return finalResponse;
}

export async function generateDemonResponse(
  userMessage: string,
  userName: string,
  conversationHistory: Message[]
): Promise<string> {
  return await callHuggingFaceAPI(userMessage, userName, conversationHistory);
}
