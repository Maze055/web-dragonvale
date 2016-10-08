/* tslint:disable:no-unused-variable */

/**
 * Created by maze on 9/25/16.
 *
 * ImgUrl pipe tests file.
 */

import ImgUrlPipe from './img-url.pipe';

describe('ImgUrl pipe', () => {
    beforeAll(() => {
      this.pipe = new ImgUrlPipe();
      this.dragonName = 'Rust';
      this.elem = 'Water';
    });

    it('should create an instance', () => {
        expect(this.pipe).toBeTruthy();
    });

    describe('standard tests:', () => {
        it(`should generate ${ this.dragonName } egg image URL`, () => {
            expect(this.pipe.transform(this.dragonName, 'egg'))
                .toEqual('//vignette3.wikia.nocookie.net/dragonvale/images/1/1f/RustDragonEgg.png');
        });

        it(`should generate ${ this.dragonName } dragon image URL`, () => {
            expect(this.pipe.transform(this.dragonName, 'dragon'))
                .toEqual('//vignette3.wikia.nocookie.net/dragonvale/images/6/6d/RustDragonAdult.png');
        });

        it(`should generate ${ this.elem } elemental flag image URL`, () => {
            expect(this.pipe.transform(this.elem, 'elemFlag'))
                .toEqual('//vignette3.wikia.nocookie.net/dragonvale/images/e/e5/Water_Flag.png');
        });
    });

    describe('pathological cases tests:', () => {
        it('should generate seasonal dragon image URL for the current season', () => {
            expect(this.pipe.transform('Seasonal', 'dragon'))
                .toEqual('//vignette3.wikia.nocookie.net/dragonvale/images/0/04/AutumnSeasonalDragonAdult.png');
        });

        it('should generate Monolith 3 dragon image URL', () => {
            expect(this.pipe.transform('Monolith 3', 'dragon'))
                .toEqual('//vignette3.wikia.nocookie.net/dragonvale/images/4/40/MonolithDragonAdult3.png');
        });

        it('should generate Snowflake egg image URL', () => {
            expect(this.pipe.transform('Snowflake 4', 'egg'))
                .toEqual('//vignette3.wikia.nocookie.net/dragonvale/images/4/40/SnowflakeDragonEgg.png');
        });
    });
});
