/**
 * Created by maze on 9/25/16.
 *
 * This pipe generates Dragonvale Wiki image URLs
 * of generic files, eggs, adult dragons and
 * elemental flags.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import moment = require('moment');

@Pipe({
    name: 'imgUrl'
})
export default class ImgUrlPipe implements PipeTransform {

    /** Initial part of any returned URL. */
    private static readonly BASE_URL = '//vignette3.wikia.nocookie.net/dragonvale/images';

    /** Seasons names, sorted by year's quarters. */
    private static readonly SEASONS = ['Winter', 'Spring', 'Summer', 'Autumn'];

    /**
     * Returns the Dragonvale Wiki URL of the passed file name.
     *
     * @param fileName Input filename.
     * @return URL of fileName on Dragonvale WIki.
     */
    private static getImg(fileName: string): string {
        fileName = fileName.replace(/ /g, '');
        var checkSum = <string> Md5.hashStr(fileName);
        return [ImgUrlPipe.BASE_URL, checkSum[0], checkSum.substr(0, 2),
            fileName].join('/');
    };

    /**
     * This function returns the capitalized english
     * season name of the specified date, defaulting
     * to current, with some approximations.
     *
     * @param [date=moment()] The date whose season will be returned.
     * @return Capitalized english season name of the provided date.
     *
     * @see {@link http://momentjs.com/docs moment.js documentation}
     */
    private static getSeason(date?: moment.Moment): string {
        if (!(date instanceof moment))
            date = moment();

        return ImgUrlPipe.SEASONS[date.quarter() - 1];
    };

    /**
     * This function derives the egg name from the
     * one of the passed dragon. It is not worthless due
     * to Seasonal, Snowflake and Monolith dragons
     * having different names for dragon and egg images.
     *
     * @param name The name of the dragon.
     * @return The egg name of the passed dragon.
     */
    private static getEggName(name: string): string  {
        var eggName = name.match(/(Snowflake|Monolith)/);
        return eggName ? eggName[0] : name;
    };

    /**
     * Object of functions to get the dragon pictures for
     * Snowflake, Monolith and Seasonal dragons, since
     * they're not the same ass the egg name: Seasonal
     * has seasons in dragon picture, while Snowflake
     * and Monolith share the same egg for all of a kind.
     */
    private static getWeirdDragonImg: any = {

        /**
         * Returns Dragonvale Wiki picture URL for
         * Snowflake/Monolith dragons.
         *
         * @param name The name of the dragon, either 'Snowflake' or 'Monolith' followed by a number between 1 and 5.
         * @param eggName The name of the dragon species.
         * @return Dragonvale Wiki picture URL of given Snowflake/Monolith dragon.
         */
        Snowflake(name: string, eggName: 'Snowflake' | 'Monolith'): string {
            return ImgUrlPipe.getImg(eggName + 'DragonAdult' + name.slice(-1) + '.png');
        },

        /**
         * Returns Dragonvale Wiki picture URL for Seasonal
         * dragon in the season of a provided date.
         *
         * @param [date=moment()] The date used to get the season.
         * @return Dragonvale Wiki picture URL of Seasonal dragon in the season of the passed date.
         *
         * @see {@link http://momentjs.com/docs moment.js documentation}
         */
        Seasonal(date?: moment.Moment): string {
            return ImgUrlPipe.getImg(ImgUrlPipe.getSeason(date) + 'SeasonalDragonAdult.png');
        }
    };

    /**
     * Object of functions returning a Dragonvale Wiki
     * image URL of a specific type.
     */
    private static imgTypes: { [x: string]: (name: string) => string } = {

        /**
         * Returns the egg Dragonvale Wiki picture URL
         * for the dragon having the passed name.
         *
         * @param name The name of the dragon.
         * @return Dragonvale Wiki egg picture URL of the passed dragon.
         */
        egg(name: string): string {
            return ImgUrlPipe.getImg(ImgUrlPipe.getEggName(name) + 'DragonEgg.png');
        },

        /**
         * Returns the adult dragon Dragonvale Wiki picture
         * URL for the dragon having the passed name.
         *
         * @param name The name of the dragon.
         * @return Dragonvale Wiki adult dragon picture URL of the passed dragon.
         */
        dragon(name: string): string {
            var eggName = ImgUrlPipe.getEggName(name);
            return ImgUrlPipe.getWeirdDragonImg[eggName]
                ? ImgUrlPipe.getWeirdDragonImg[eggName](name, eggName)
                : ImgUrlPipe.getImg(name + 'DragonAdult.png');
        },

        /**
         * Returns the elemental flag Dragonvale Wiki picture URL
         * for the element having the passed name.
         *
         * @param elem The name of the element.
         * @return Dragonvale WIki elemental flag picture URL of the passed element.
         */
        elemFlag(elem: string): string {
            return ImgUrlPipe.getImg(elem + '_Flag.png');
        }
    };

    public constructor() {

        // Same logic for Monolith and Snowflake
        ImgUrlPipe.getWeirdDragonImg.Monolith = ImgUrlPipe.getWeirdDragonImg.Snowflake;
    }

    /**
     * The actual pipe function.
     *
     * @param name The name of the dragon or element to process.
     * @param resultType The type of Dragonvale Wiki URL image to be returned.
     * @return The Dragonvale Wiki URL image of the given type for the provided input.
     */
    public transform(name: string, resultType: string): string {
        return ImgUrlPipe.imgTypes[resultType](name);
    }
}
