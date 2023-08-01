export const taxonomyVerbEnum = {
    Create: 'Create',
    Evaluate: 'Evaluate',
    Analyze: 'Analyze',
    Apply: 'Apply',
    Understand: 'Understand',
    Remember: 'Remember'
};

export const taxonomyVerbList = [ 
    {
        level: taxonomyVerbEnum.Create,
        position: 6,
        definition: 'Combining parts to make a new whole.',
        verbs: [ 'design', 'formulate', 'build', 'invent', 'create', 'compose', 'generate', 'derive', 'modify', 'develop'],
        example: 'By the end of this lesson, the student will be able to design an original homework problem dealing with the principle of conservation of energy.',
        color: '#F68C1E'
    },
    {
        level: taxonomyVerbEnum.Evaluate,
        position: 5,
        definition: 'Judging the value of information or ideas.',
        verbs: [ 'choose', 'support', 'relate', 'determine', 'defend', 'judge', 'grade', 'compare', 'contrast', 'argue', 'justify', 'support', 'convince', 'select', 'evaluate'],
        example: 'By the end of this lesson, the student will be able to determine whether using conservation of energy or conservation of momentum would be more appropriate for solving a dynamics problem.',
        color: '#FDC20E'
    },
    {
        level: taxonomyVerbEnum.Analyze,
        position: 4,
        definition: 'Breaking down information into component parts.',
        verbs: [ 'classify', 'break down', 'categorize', 'analyze', 'diagram', 'illustrate', 'criticize', 'simplify', 'associate' ],
        example: 'By the end of this lesson, the student will be able to differentiate between potential and kinetic energy.',
        color: '#89B83F'
    },
    {
        level: taxonomyVerbEnum.Apply,
        position: 3,
        definition: 'Applying the facts, rules, concepts and ideas.',
        verbs: [ 'calculate', 'predict', 'apply', 'solve', 'illustrate', 'use', 'demonstrate', 'determine', 'model', 'perform', 'present' ],
        example: 'By the end of this lesson, the student will be able to calculate the kinetic energy of a projectile.',
        color: '#78D1F0'
    },  
    {
        level: taxonomyVerbEnum.Understand,
        position: 2,
        definition: 'Understanding what the facts mean.',
        verbs: [ 'describe', 'explain', 'paraphrase', 'restate', 'give original examples of', 'summarize', 'contrast', 'interpret', 'discuss' ],
        example: 'By the end of this lesson, the student will be able to describe Newton’s three laws of motion to in her/his own words.',
        color: '#6C94C4'
    }, 
    {
        level: taxonomyVerbEnum.Remember,
        position: 1,
        definition: 'Recognizing and recalling facts.',
        verbs: [ 'list', 'recite', 'outline', 'define', 'name', 'match', 'quote', 'recall', 'identify', 'label', 'recognize' ],
        example: 'By the end of this lesson, the student will be able to recite Newton’s three laws of motion.',
        color: '#AA7FB8'
    }
];