export const dataKeySections = (memoizedSectionsPromotions: any[], memoizedSections: any[]) => {
    const sections = [...memoizedSectionsPromotions, ...memoizedSections];
    const sectionReturn = sections.map((item: any) => item[0])
    return [...new Set(sectionReturn)]
}