
// finding emotion through interactions
export const detectEmotion = (interactions, sessionDuration) => {
    let scrolls = 0;
    let pauses = 0;
    let skips = 0;
    let focusLost = 0;

    interactions.forEach(i => {
        if(i.interaction_type === 'scroll') scrolls++;
        if(i.interaction_type === 'pause') pauses++;
        if(i.interaction_type === 'skip') skips++;
        if(i.interaction_type === 'focusLost') focusLost++;   
    });

    // RULE 1: Confusion
    if (scrolls > 10 && pauses > 5) {
        return { emotion: "confused", confidence: 0.75 };
    }

    // RULE 2: Boredom
    if (skips > 3 || focusLost > 5) {
        return { emotion: "bored", confidence: 0.7 };
    } 

    // RULE 3: Frustration
    if (pauses > 10 && sessionDuration > 900) {
        return { emotion: "frustrated", confidence: 0.8 };
    }

    // RULE 4: Engagement
    if (scrolls > 5 && pauses < 2 && skips === 0) {
        return { emotion: "engaged", confidence: 0.85 };
    }

    // DEFAULT
    return { emotion: "focused", confidence: 0.6 };
};