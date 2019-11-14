import lang from 'dojo/_base/lang';
import topic from 'dojo/topic';

import

let storyMap = 'Story Map';

export default class Controller{
    
    static renderStory(config, sections){
        this._sections = [];
        this._currentSection = null;
        this._$currentSection = null;
        this._currentSectionIndex = null;
        this._container = $('.sections');        
        
        var errorInPreviousSection = false,
        sectionsLength = sections.length;
    }
    
}