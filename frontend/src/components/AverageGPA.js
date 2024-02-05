const AverageGPA = (Taken) => {
    let totalGPA = 0;
    
    if (!Array.isArray(Taken) || Taken.length === 0) {
        console.error("Taken is not a valid array.");
        return 0; 
    }

    for (const taken of Taken) {
        switch (taken.letterGrade) {
            case 'A+':
                totalGPA += 4.3;
                break;
            case 'A':
                totalGPA += 4.0;
                break;
            case 'A-':
                totalGPA += 3.7;
                break;
            case 'B+':
                totalGPA += 3.3;
                break;
            case 'B':
                totalGPA += 3.0;
                break;
            case 'B-':
                totalGPA += 2.7;
                break;
            case 'C+':
                totalGPA += 2.3;
                break;
            case 'C':
                totalGPA += 2.0;
                break;
            case 'C-':
                totalGPA += 1.7;
                break;
            case 'D':
                totalGPA += 1.0;
                break;
            case 'F':
                totalGPA += 0.0;
                break;
            default:
                break;
        
        }
    }
    return (totalGPA / Taken.length);
}

export default AverageGPA;