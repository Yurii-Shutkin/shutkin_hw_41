'use strict';

(() => {

    class Human {

        constructor(firstName, lastName, yearOfBirth) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.yearOfBirth = yearOfBirth;
            this.age = this.#getAge();
            this.attendance = new Array(10);
            this.marks = new Array(10);
            this.overagePoints = {mark: null, attendance: null};
            this.teacherComment = null;

            for(const arg of arguments) {
                if(typeof arg !== 'string' || !arg.trim()) {
                    throw new Error('Argument(s) data type is not a string or empty.');
                };
            };

            if(

                this.yearOfBirth.length !== 4 || 
                !Number.isInteger(+this.yearOfBirth) || 
                this.yearOfBirth < 0

            )   throw new Error('The last argument must contain four-digit positive integer: "YYYY".');

            if(this.yearOfBirth > new Date().getFullYear()) throw new Error('Not valid data.');
        };

        static isHuman(obj) {
            return obj instanceof this;
        };

        #getAge() {
            return new Date().getFullYear() - this.yearOfBirth;
        };

        _findEmptyElIndex(arr) {
            return arr.findIndex(item => {
                if (item === undefined) return true;
            });
        };

        _checkVisits(boolean) {
            if(typeof boolean !== 'boolean') throw new Error('Argument data type is not a boolean.')
            const emptyElIndex = this._findEmptyElIndex(this.attendance);
            if(emptyElIndex >= 0) this.attendance[emptyElIndex] = boolean;
        };

        _isNumber(num) {
            if(typeof num === 'number' || !isNaN(num)) return true;
            return false;
        };

        #overageValue(arr) {
            let emptyElIndex = this._findEmptyElIndex(arr);
            if(emptyElIndex === -1) emptyElIndex = arr.length;
            return arr.reduce((a, b) => (a + b)) / emptyElIndex;
        };

        _overageMark() {
            this.overagePoints.mark = Math.round(this.#overageValue(this.marks));
        };

        _overageAttendance() {
            this.overagePoints.attendance = +this.#overageValue(this.attendance).toFixed(1);
        };

        _addComment() {

            if(this.overagePoints.mark >= 9 && this.overagePoints.attendance >= 0.9) {
                this.teacherComment = 'Ути какой молодчинка!';
            } else if (this.overagePoints.mark < 9 && this.overagePoints.attendance < 0.9 ) {
                this.teacherComment = 'Редиска!';
            } else if(this.overagePoints.mark < 9 || this.overagePoints.attendance < 0.9) {
                this.teacherComment = 'Норм, но можно лучше';
            };

        };
    };

    class Student extends Human {

        present() {
            this._checkVisits(true);
            return this;
        };

        absent() {
            this._checkVisits(false);
            return this;
        };

        mark(num) {
            if(!this._isNumber(num)) throw new Error('The argument is not a number.');
            if(num < 0 || num > 10) throw new Error('The max value of mark cannot exceed 10.');
            const emptyElIndex = this._findEmptyElIndex(this.marks);
            if(emptyElIndex >= 0) this.marks[emptyElIndex] = num;
            return this;
        };

        summary() {
            if(this._findEmptyElIndex(this.marks) === 0 || this._findEmptyElIndex(this.attendance) === 0) return;
            this._overageMark();
            this._overageAttendance();
            this._addComment();
            return this;
        };
    };

    const alex = new Student ('Alex', 'Turner', '1986');
    const yurii = new Student('Yurii','Shutkin', '1996');
    const vova = new Student('Vladimir', 'Shaitan', '1997');
    const noname = new Student('Unknown', 'Unknown', '0000');

    alex.summary();
    yurii.present().present().present().present().present().present().present().present().present().present().present().mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).mark(10).summary();
    vova.absent().mark(1).present().mark(0).summary();
    noname.present().present().absent().present().absent().present().present().mark(10).mark(10).mark(10).mark(8).mark(7).mark(9).mark(10).summary();

    console.log(alex);
    console.log(yurii);
    console.log(vova);
    console.log(noname);

    console.log(Human.isHuman(noname));
})();