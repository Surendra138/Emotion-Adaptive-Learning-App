export const decideNextContent = ({ emotion, lastScore, currentDifficulty }) => {
    let preferredType = "article";
    let nextDifficulty = currentDifficulty;


    // emotion-based adaption 
    if (emotion === "confused" || emotion === "frustrated") {
        nextDifficulty = "beginner";
        preferredType = "video";
    }

    if (emotion === "bored") {
        preferredType = "quiz";
    }

    if (emotion === "engaged" && lastScore >= 70) {
        nextDifficulty = "intermediate";
        preferredType = "quiz";
    }

    if (emotion === "focused") {
        preferredType = "article";
    }
    
    return (
        {
            difficulty: nextDifficulty,
            content_type: preferredType
        }
    );
};