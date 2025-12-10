// Create stars
function createStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = star.style.height = Math.random() * 3 + 'px';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}
createStars();

// Game state
let currentQuestion = 0;
let scores = { mozi: 0, confucius: 0, laozi: 0, mengzi: 0 };

// Questions - Natural everyday scenarios, no philosophical framing
const questions = [
    {
        text: "You see a stranger's child in danger. What's your immediate reaction?",
        choices: [
            { text: "I feel a strong emotional pull to help - it's instinctive.", philosophy: "mengzi", points: 3 },
            { text: "Their child's safety matters just as much as anyone else's.", philosophy: "mozi", points: 3 },
            { text: "I think about whether I know this family or have any connection to them.", philosophy: "confucius", points: 3 },
            { text: "I just act - there's no time to think about why.", philosophy: "laozi", points: 3 }
        ]
    },
    {
        text: "Your neighborhood is doing well, but you hear about a crisis in another city you've never visited. How do you think about helping?",
        choices: [
            { text: "People suffering far away deserve help just as much as people nearby.", philosophy: "mozi", points: 3 },
            { text: "I'd focus on my own community first - that's my primary responsibility.", philosophy: "confucius", points: 3 },
            { text: "Maybe both places are too focused on having more instead of needing less.", philosophy: "laozi", points: 3 },
            { text: "Hearing about their situation makes me feel for them and want to help.", philosophy: "mengzi", points: 3 }
        ]
    },
    {
        text: "A friend asks: 'How do good people become good?' What's your gut answer?",
        choices: [
            { text: "I think we're born with a sense of right and wrong that just needs encouragement.", philosophy: "mengzi", points: 3 },
            { text: "By being raised well, learning from role models, and practicing good habits.", philosophy: "confucius", points: 3 },
            { text: "By letting go of society's pressures and living more simply.", philosophy: "laozi", points: 3 },
            { text: "By thinking about what's fair and beneficial for everyone, not just themselves.", philosophy: "mozi", points: 3 }
        ]
    },
    {
        text: "Someone who got rich in shady ways wants to donate a lot of money to your local school. What's your reaction?",
        choices: [
            { text: "If it helps the kids, that's what matters most in the end.", philosophy: "mozi", points: 3 },
            { text: "It feels wrong - you can't build something good on a bad foundation.", philosophy: "confucius", points: 3 },
            { text: "The whole situation is messy because of our obsession with money and status.", philosophy: "laozi", points: 3 },
            { text: "Maybe doing something good will help them remember what's right.", philosophy: "mengzi", points: 3 }
        ]
    },
    {
        text: "Your mom/dad did something wrong. The police ask you about it. What do you feel you should do?",
        choices: [
            { text: "Protect my parent - family comes first.", philosophy: "confucius", points: 3 },
            { text: "Be honest - it's better for society if everyone tells the truth.", philosophy: "mozi", points: 2 },
            { text: "Trust my gut in the moment about what feels right.", philosophy: "mengzi", points: 2 },
            { text: "This whole situation shows how rules and laws complicate natural relationships.", philosophy: "laozi", points: 2 }
        ]
    },
    {
        text: "There's a terrible leader causing a lot of harm. What should happen?",
        choices: [
            { text: "If they're really that bad, people have a right to remove them from power.", philosophy: "mengzi", points: 3 },
            { text: "Others should lead by example and gradually influence them to change.", philosophy: "confucius", points: 3 },
            { text: "The fact we even have this problem means we've built society wrong.", philosophy: "laozi", points: 3 },
            { text: "Do whatever stops the most people from getting hurt.", philosophy: "mozi", points: 3 }
        ]
    },
    {
        text: "Your family spends a lot on weddings, funerals, and holiday celebrations. What do you think about that?",
        choices: [
            { text: "These bring families together and mean something important.", philosophy: "confucius", points: 3 },
            { text: "It seems wasteful when that money could help people who really need it.", philosophy: "mozi", points: 3 },
            { text: "A lot of it feels unnecessary and forced by social expectations.", philosophy: "laozi", points: 3 },
            { text: "They're nice if people genuinely care, but they don't make people good.", philosophy: "mengzi", points: 2 }
        ]
    },
    {
        text: "Your city has a lot of crime and conflict. If you were mayor, what would you try?",
        choices: [
            { text: "Be a good example myself and hope it influences others.", philosophy: "confucius", points: 3 },
            { text: "Back off on control - sometimes less rules leads to better behavior.", philosophy: "laozi", points: 3 },
            { text: "Set up clear, fair rules that apply equally to everyone.", philosophy: "mozi", points: 3 },
            { text: "Help people remember their basic human decency.", philosophy: "mengzi", points: 3 }
        ]
    },
    {
        text: "Another country might attack yours. What's the right move?",
        choices: [
            { text: "Get ready to defend ourselves, but never strike first.", philosophy: "mozi", points: 3 },
            { text: "Make our own country better so they have less reason to attack.", philosophy: "confucius", points: 3 },
            { text: "The fact that war is even happening means society is fundamentally broken.", philosophy: "laozi", points: 3 },
            { text: "Try to appeal to what we all share as humans.", philosophy: "mengzi", points: 3 }
        ]
    },
    {
        text: "Why do you think bad things happen in the world?",
        choices: [
            { text: "People forget their natural sense of right and wrong.", philosophy: "mengzi", points: 3 },
            { text: "Relationships break down and people don't respect their roles.", philosophy: "confucius", points: 3 },
            { text: "Life gets too complicated and we interfere with things too much.", philosophy: "laozi", points: 3 },
            { text: "People care more about their own than about everyone equally.", philosophy: "mozi", points: 3 }
        ]
    },
    {
        text: "When you have to make a tough choice about right and wrong, what do you lean on?",
        choices: [
            { text: "I think about what helps the most people.", philosophy: "mozi", points: 3 },
            { text: "I consider what my role and responsibilities are.", philosophy: "confucius", points: 3 },
            { text: "I try to let the answer come naturally without forcing it.", philosophy: "laozi", points: 3 },
            { text: "I pay attention to my immediate gut feeling.", philosophy: "mengzi", points: 3 }
        ]
    },
    {
        text: "If you had to give someone just one piece of life advice, what would it be?",
        choices: [
            { text: "Trust your good instincts and let that kindness spread outward.", philosophy: "mengzi", points: 3 },
            { text: "Take care of your relationships and do right by the people in your life.", philosophy: "confucius", points: 3 },
            { text: "Keep things simple and don't stress about things you can't control.", philosophy: "laozi", points: 3 },
            { text: "Treat everyone's problems like they're your own problems.", philosophy: "mozi", points: 3 }
        ]
    }
];

function startGame() {
    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Reset game state
    currentQuestion = 0;
    scores = { mozi: 0, confucius: 0, laozi: 0, mengzi: 0 };
    
    showQuestion(0);
}

function showQuestion(questionIndex) {
    currentQuestion = questionIndex;
    const question = questions[questionIndex];
    
    // Update progress indicators
    const totalQuestions = questions.length;
    for (let i = 1; i <= 5; i++) {
        const indicator = document.getElementById(`ind-${i}`);
        const progress = (questionIndex / totalQuestions) * 5;
        if (i <= progress) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    }
    
    // Update wisdom orbs
    for (let i = 1; i <= 5; i++) {
        const orb = document.getElementById(`orb-${i}`);
        const progress = (questionIndex / totalQuestions) * 5;
        if (i < progress) {
            orb.classList.add('filled');
        } else {
            orb.classList.remove('filled');
        }
    }
    
    // Animate sage speaking
    const sage = document.getElementById('sage');
    sage.style.animation = 'none';
    setTimeout(() => {
        sage.style.animation = 'breathe 3s ease-in-out infinite';
    }, 100);
    
    // Update text - show question number
    const questionNumber = questionIndex + 1;
    document.getElementById('sage-text').textContent = `Question ${questionNumber} of ${totalQuestions}: ${question.text}`;
    
    // Create choice buttons - NO philosopher names shown
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.innerHTML = `<span class="choice-number">${String.fromCharCode(65 + index)}</span>${choice.text}`;
        button.onclick = () => selectChoice(choice);
        
        // Stagger animation
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = `fadeIn 0.5s ease-in ${index * 0.1}s both`;
        }, 100);
        
        choicesDiv.appendChild(button);
    });
}

function selectChoice(choice) {
    scores[choice.philosophy] += choice.points;
    
    if (currentQuestion < questions.length - 1) {
        showQuestion(currentQuestion + 1);
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('game-screen').classList.add('hidden');
    const resultsScreen = document.getElementById('results-screen');
    resultsScreen.classList.remove('hidden');
    resultsScreen.classList.remove('game-over');
    
    // Calculate percentages
    const total = scores.mozi + scores.confucius + scores.laozi + scores.mengzi;
    const percentages = {
        mengzi: Math.round((scores.mengzi / total) * 100),
        confucius: Math.round((scores.confucius / total) * 100),
        laozi: Math.round((scores.laozi / total) * 100),
        mozi: Math.round((scores.mozi / total) * 100)
    };
    
    // Find highest score
    let maxPhilosophy = 'mengzi';
    let maxScore = percentages.mengzi;
    for (let phil in percentages) {
        if (percentages[phil] > maxScore) {
            maxPhilosophy = phil;
            maxScore = percentages[phil];
        }
    }
    
    // Philosophy profiles with detailed academic descriptions
    const profiles = {
        mengzi: {
            name: "Mengzi 孟子 (Mencius, 372-289 BCE)",
            shortName: "Mengzi",
            description: "Your responses most closely align with Mengzi's philosophical framework. Mengzi taught that human nature (xing 性) is inherently good (shan 善), a position known as xing shan (性善). He identified four innate moral \"sprouts\" (siduan 四端): compassion (cexin 惻隱), shame (xiuwu 羞惡), courtesy (cirang 辭讓), and moral discernment (shifei 是非). Your answers suggest you trust natural moral intuitions, believe in extending care outward from family to all beings (tui 推), and have faith in human goodness despite external corruption. You likely support the concept of the Mandate of Heaven (tianming 天命), where rulers who lose virtue lose legitimacy. Core text: Mengzi (Mencius)."
        },
        confucius: {
            name: "Confucius 孔子 (Kongzi, 551-479 BCE)",
            shortName: "Confucius", 
            description: "Your responses most closely align with Confucius's philosophical framework. Confucius emphasized ren (仁 - humaneness/benevolence), li (禮 - ritual propriety), and yi (義 - righteousness) as foundational virtues. Your answers suggest you value proper relationships, social roles, and the cultivation of virtue through education and ritual practice. You likely believe in the importance of xiao (孝 - filial piety), the power of moral example over force, and that society flourishes through harmonious relationships (he 和). You see tradition and ritual as vessels that carry wisdom across generations, not as empty forms. The ideal person is the junzi (君子 - gentleman/noble person) who transforms society through moral cultivation. Core text: Analects (Lunyu 論語)."
        },
        laozi: {
            name: "Laozi 老子 (Legendary founder of Daoism)",
            shortName: "Laozi",
            description: "Your responses most closely align with Laozi's philosophical framework. Laozi taught that the highest wisdom lies in following the Dao (道 - the Way) through wu wei (無為 - non-forcing action) and ziran (自然 - naturalness/spontaneity). Your answers suggest you trust natural processes over human intervention, value simplicity (pu 樸 - the uncarved block) over complexity, and believe problems often arise from excessive control and artificial constructs. You likely see that \"the softest things in the world overcome the hardest\" and that governing should be like \"cooking a small fish\" - with minimal interference. You question whether more laws, knowledge, and ambition actually create the problems they claim to solve. Core text: Daodejing (道德經)."
        },
        mozi: {
            name: "Mozi 墨子 (Mo Di, c. 470-391 BCE)",
            shortName: "Mozi",
            description: "Your responses most closely align with Mozi's philosophical framework. Mozi taught jian ai (兼愛 - impartial care/universal love), arguing that we should care for all people equally without favoritism. Your answers suggest you evaluate actions by their consequences for everyone, oppose partiality and discrimination, and believe that distinctions between \"mine\" and \"theirs\" create conflict. You likely support jie yong (節用 - moderation in use), opposing wasteful rituals when resources could help those in need. You probably agree with fei gong (非攻 - condemnation of offensive warfare) while supporting strong defense. Your ethical framework is consequentialist with principled limits, judging actions by whether they benefit all people. Core text: Mozi."
        }
    };
    
    const profile = profiles[maxPhilosophy];
    
    // Scientific results header
    document.getElementById('philosophy-name').textContent = 'Your Philosophical Profile Analysis';
    document.getElementById('philosophy-description').innerHTML = `
        <div style="background: rgba(255, 215, 0, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #ffd700;">
            <h3 style="margin: 0 0 10px 0; color: #ffd700;">Primary Alignment: ${profile.name}</h3>
            <p style="margin: 0; line-height: 1.8;">${profile.description}</p>
        </div>
    `;
    
    // Show percentage breakdown - SCIENTIFIC FORMAT
    const traitList = document.getElementById('trait-list');
    traitList.innerHTML = '';
    
    const breakdownTitle = document.createElement('div');
    breakdownTitle.className = 'trait';
    breakdownTitle.style.gridColumn = '1 / -1';
    breakdownTitle.style.fontWeight = 'bold';
    breakdownTitle.style.borderLeft = '3px solid #ffd700';
    breakdownTitle.style.fontSize = '1.1em';
    breakdownTitle.textContent = 'Complete Philosophical Distribution:';
    traitList.appendChild(breakdownTitle);
    
    // Sort by percentage for display
    const philosopherInfo = {
        mengzi: { 
            name: 'Mengzi 孟子', 
            fullName: 'Mengzi (Mencius)', 
            dates: '372-289 BCE', 
            concept: 'Human Nature is Good',
            tooltip: 'Mengzi believed humans are born inherently good with four moral "sprouts": compassion, shame, courtesy, and wisdom. We naturally feel for others and can extend this care outward. Corruption comes from bad environments, not bad nature. Tyrants lose the right to rule (Mandate of Heaven).'
        },
        confucius: { 
            name: 'Confucius 孔子', 
            fullName: 'Confucius (Kongzi)', 
            dates: '551-479 BCE', 
            concept: 'Virtue through Ritual & Relationships',
            tooltip: 'Confucius taught that virtue develops through proper relationships, education, and ritual practice. Key concepts: ren (benevolence), li (ritual propriety), xiao (filial piety). Society flourishes when everyone fulfills their roles with integrity. Lead by moral example, not force.'
        },
        laozi: { 
            name: 'Laozi 老子', 
            fullName: 'Laozi', 
            dates: 'Legendary', 
            concept: 'The Natural Way (Dao)',
            tooltip: 'Laozi taught wu wei (non-forcing action) and following the natural Way (Dao). Like water that\'s soft yet wears away stone, the best approach is often minimal intervention. Complexity creates problems. Simplicity and spontaneity are wisdom. Let things unfold naturally.'
        },
        mozi: { 
            name: 'Mozi 墨子', 
            fullName: 'Mozi (Mo Di)', 
            dates: 'c. 470-391 BCE', 
            concept: 'Universal Impartial Care',
            tooltip: 'Mozi taught jian ai (universal love) - care for all people equally without favoritism. Judge actions by their consequences for everyone. Oppose wasteful rituals and offensive warfare. Practical, utilitarian ethics: what benefits all humanity is good, what harms is bad.'
        }
    };
    
    const sorted = [
        { key: 'mengzi', percent: percentages.mengzi, info: philosopherInfo.mengzi },
        { key: 'confucius', percent: percentages.confucius, info: philosopherInfo.confucius },
        { key: 'laozi', percent: percentages.laozi, info: philosopherInfo.laozi },
        { key: 'mozi', percent: percentages.mozi, info: philosopherInfo.mozi }
    ].sort((a, b) => b.percent - a.percent);
    
    sorted.forEach((phil, index) => {
        const philDiv = document.createElement('div');
        philDiv.className = 'trait';
        philDiv.style.gridColumn = '1 / -1';
        philDiv.style.padding = '12px';
        
        if (index === 0) {
            philDiv.style.backgroundColor = 'rgba(255, 215, 0, 0.2)';
            philDiv.style.borderLeft = '4px solid #ffd700';
        }
        
        philDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div class="philosopher-info" style="flex: 1;">
                    <div style="font-weight: bold; font-size: 1.1em;">${phil.info.name}</div>
                    <div style="font-size: 0.85em; opacity: 0.8; margin-top: 2px;">${phil.info.dates} • ${phil.info.concept}</div>
                    <div class="philosopher-tooltip">
                        <strong>${phil.info.name}</strong>
                        ${phil.info.tooltip}
                    </div>
                </div>
                <div style="font-size: 1.8em; font-weight: bold; color: #ffd700;">${phil.percent}%</div>
            </div>
            <div style="height: 12px; background: rgba(255, 255, 255, 0.1); border-radius: 6px; overflow: hidden;">
                <div style="width: ${phil.percent}%; height: 100%; background: linear-gradient(90deg, #ffd700, #ffed4e); transition: width 1s ease;"></div>
            </div>
        `;
        traitList.appendChild(philDiv);
    });
    
    // Add statistical interpretation
    const interpretation = document.createElement('div');
    interpretation.className = 'trait';
    interpretation.style.gridColumn = '1 / -1';
    interpretation.style.marginTop = '15px';
    interpretation.style.padding = '15px';
    interpretation.style.background = 'rgba(255, 255, 255, 0.05)';
    interpretation.style.borderLeft = '3px solid rgba(255, 215, 0, 0.5)';
    interpretation.style.lineHeight = '1.6';
    
    const highest = sorted[0];
    const secondHighest = sorted[1];
    const difference = highest.percent - secondHighest.percent;
    
    if (highest.percent >= 50) {
        interpretation.innerHTML = `<strong>Strong Alignment:</strong> Your responses show a clear affinity (${highest.percent}%) with ${highest.info.fullName}'s philosophical framework. This suggests your ethical intuitions and worldview are strongly shaped by this tradition's core principles.`;
    } else if (difference <= 10) {
        interpretation.innerHTML = `<strong>Syncretic Profile:</strong> Your scores are relatively balanced between ${highest.info.name} (${highest.percent}%) and ${secondHighest.info.name} (${secondHighest.percent}%). This suggests you draw from multiple philosophical traditions - a sophisticated and contextual approach to ethics.`;
    } else {
        interpretation.innerHTML = `<strong>Moderate Alignment:</strong> You lean towards ${highest.info.fullName} (${highest.percent}%), but your responses indicate you incorporate insights from multiple traditions. This eclecticism reflects practical philosophical flexibility.`;
    }
    
    traitList.appendChild(interpretation);
    
    // Add methodology note
    const methodology = document.createElement('div');
    methodology.className = 'trait';
    methodology.style.gridColumn = '1 / -1';
    methodology.style.fontSize = '0.85em';
    methodology.style.opacity = '0.7';
    methodology.style.fontStyle = 'italic';
    methodology.style.marginTop = '10px';
    methodology.textContent = `Methodology: 12 questions assessing ethical intuitions across key philosophical dimensions. Responses weighted 2-3 points per philosopher. Results reflect alignment with historical philosophical positions from Classical Chinese texts (c. 500-200 BCE).`;
    traitList.appendChild(methodology);
}

function restartGame() {
    // Reset wisdom orbs
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`orb-${i}`).classList.remove('filled');
        document.getElementById(`ind-${i}`).classList.remove('active');
    }
    
    // Go back to title
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('title-screen').classList.remove('hidden');
}
