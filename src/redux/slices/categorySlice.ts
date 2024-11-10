import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Item } from '../../models/Item.model';
// דוגמא ליצירת מחלקה בחנות

const categorySlice = createSlice({
    //רשימת קטגוריות
    initialState: {
        categories: [
            "ספות",
            "שולחנות",
            "ארונות",
            "מיטות",
            "שולחנות צד",
            "כורסאות"
        ]
        //קטגוריות מובילות
        , arrayName: [
            "חדרי שינה", "מיטות מרופדות", "מזנונים", "מערכת ישיבה לסלון",
            "שולחנות לסלון", "ספות נוער", "מזרנים", "כורסאות",
            "מעמדים ושונות", "ויטרינות", "פינות אוכל", "חדרי ילדים"
        ],
        items: Array.from({ length: 12 }, (_, index) => (new Item
            ("", `/pic${index + 1}.png`, [
                "חדרי שינה", "מיטות מרופדות", "מזנונים", "מערכת ישיבה לסלון",
                "שולחנות לסלון", "ספות נוער", "מזרנים", "כורסאות",
                "מעמדים ושונות", "ויטרינות", "פינות אוכל", "חדרי ילדים"
            ][index], index, [
                "קטגוריה זו כוללת רהיטים לחדרי שינה בבית. היא מכילה מיטות כפולות ויחידות, ארונות לאחסון בגדים, ארוניות לאחסון נוסף, שולחנות לידי המיטה ואביזרים נוספים לחדר שינה."
                ,

                "מיטות מרופדות הן בחירה נפוצה לחדרי שינה בעיקר בגלל הנוחות שהן מספקות. הן מגיעות במגוון סגנונות ובגדלים שונים, ומיוצרות מחומרים איכותיים לצורך ישיבה נוחה ונעימה."
                ,

                "מזנונים הם ריהוט מרכזי בחדרי שינה שמשמש לאחסון בגדים ואביזרים נוספים. הם מגיעים בגדלים ובעיצובים שונים, ומספקים שטחי אחסון נוספים לבית."
                ,

                "מערכת ישיבה לסלון היא ריהוט ראשי בחלל המגורים. היא כוללת ספות, כורסאות, שולחנות סלון ואביזרים נוספים המיועדים לישיבה ולנוחות בסלון."

                ,
                "שולחנות לסלון מגיעים במגוון סגנונות ועיצובים, ומשמשים כמרכזיות בחלל הסלון לצורך הנחת כוס קפה, ספר או ציוד אחר."
                ,

                "ספות נוער הן תוספת מרגיעה לחדרי הנוער בבית. הן מגיעות בסגנונות שונים ומתאימות לישיבה נוחה וליציאות עם חברים."
                ,

                "מזרנים משמשים כבסיס למיטה ומספקים נוחות לישיבה ושינה. הם מגיעים בגדלים שונים ומיוצרים מחומרים איכותיים לנוחות מקסימלית."

                ,
                "כורסאות הן בחירה פופולרית לסלון או לחדרי שינה. הן מגיעות בסגנונות ובעיצובים שונים ומספקות ישיבה נוחה ומרגיעה."

                ,
                "מעמדים ואביזרים נוספים משמשים להוספת פונקציונליות וסגנון לחלל הבית. הם כוללים תאורה, מדפים, צמחיה ועוד."
                ,

                "ויטרינות הן אפשרות נהדרת לתצוגה של חפצים או קולקציות בבית. הן מגיעות בעיצובים שונים ומתאימות לחדרי שינה או לסלון."
                ,

                "פינות אוכל הן תוספת נעימה לבית, המיועדות לארוחות משפחתיות או ליציאות עם חברים. הן כוללות שולחנות וכיסאות בסגנון נוח."
                ,

                "חדרי ילדים כוללים ריהוט ואביזרים לילדים, כולל מיטות, שולחנות עבודה, אחסון לצעצועים וציוד נ"

            ][index])
        ))
        , currentIndex: 11,
        itemsSearch: []
    },

    //שם המחלקה
    name: 'myCategories',
    //רשימת פונקציות לעדכון הסטייט של המחלקה
    reducers: {
        //הוספת קטגוריה
        addCategoryItem: (state: any, action: PayloadAction<{ name: string, image: string, p: string }>) => {
            debugger
            const { name, image, p } = action.payload;
            state.currentIndex += 1;
            state.arrayName.push(name)
            const nweItem = new Item("", `${image}`, name, state.currentIndex, p)
            console.log(JSON.stringify(state.items))
            console.log(JSON.stringify(nweItem))
            state.items.push(nweItem)

        },
        //הסרת קטגוריה
        remuveCategory: (state, action) => {
            const updatedCategories = state.arrayName.filter(category => category !== action.payload);
            state.categories = updatedCategories;
            const updatedItems = state.items.filter(category => category.name !== action.payload);
            state.items = updatedItems;
        },
        //עדכון מערך הקטגוריות לפי חיפוש
        updateCategoryBySearch: (state: any, action: any) => {
            debugger
            state.itemsSearch = state.items
            if (state.items.length > 0) {
                var element: any = [];

                for (let index = 0; index < state.items.length; index++) {
                    if (state.items[index].name.toLowerCase().includes(action.payload.toLowerCase())) { element.push(state.items[index]) }

                }
                if (element.length > 0) { state.items = element }
                else { alert("לא נמצאו תוצאות") }
            }
            else
                alert("אין ערכים לסינון")
        }
        ,
        // עדכון קטגוריה לפי ID 
        updateCategory: (state, action: PayloadAction<{ id: any, name: string, src: string, href: any, p: string }>) => {
           debugger
            const { id, name, src, href, p } = action.payload;
            state.arrayName[id]=name
            const category = state.items.find(item => item.id === id);
            if (category) {
              category.name = name;
              category.src = src;
              category.href = href;
              category.p = p;
            }
          },
        cleanSearch: (state) => {
            state.items = state.itemsSearch
        }

    }
})
export default categorySlice.reducer
export const { remuveCategory, updateCategoryBySearch, addCategoryItem, cleanSearch,updateCategory } = categorySlice.actions

