/**
 * 有限状态机的javascript实现
 * Created by tony on 2014/4/11.
 */
perfmjs.plugin('fsm', function($$) {
    $$.base("fsm", {
        init: function() {
            if (this.options['initial']) {
                this.option('current',this.options['initial']['from']);
                this.options['stateMap'][this.options['initial']['event']] = {};
                this.options['stateMap'][this.options['initial']['event']][this.options['current']] = this.options['initial']['to'];
                if (!this.options['initial']['defer']) {
                    this.event(this.options['initial']['event']);
                }
            }
            return this;
        },
        event: function(event) {
          this.transition(event);
        },
        transition: function(event) {
            var result = false, oldState = this.options['current'];
            if (!!this['onEnterFrom' + this.upperCaseFirst(this.options['current'])]) {
                result = this['onEnterFrom' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                result = this.onEnterEvent(event);
            }
            if (typeof result !== 'undefined' && !result) {
                return;
            }

            if (!!this['onLeaveFrom' + this.upperCaseFirst(this.options['current'])]) {
                result = this['onLeaveFrom' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                result = this.onLeaveCurrentState(event);
            }
            if (typeof result !== 'undefined' && !result) {
                return;
            }

            if (this.options['stateMap'][event][oldState] !== this.options['current']) {
                return;
            }

            if (!!this['onEnterTo' + this.upperCaseFirst(this.options['current'])]) {
                result = this['onEnterTo' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                result = this.onEnterNewState(event);
            }
            if (typeof result !== 'undefined' && !result) {
                return;
            }

            if (!!this['onLeaveTo' + this.upperCaseFirst(this.options['current'])]) {
                this['onLeaveTo' + this.upperCaseFirst(this.options['current'])](event);
            } else {
                this.onLeaveEvent(event);
            }
        },
        current: function() {
            return this.options['current'];
        },
        is: function(state) {
            return this.options['current'] === state;
        },
        can: function(event) {
            return this.options['stateMap'][event].hasOwnProperty(this.options['current']) || this.options['stateMap'][event].hasOwnProperty(this.options['WILDCARD']);
        },
        cannot: function(event) {
            return !this.can(event);
        },
        isFinished: function() {
            return this.is(this.options['terminal']);
        },
        upperCaseFirst: function(str) {
            return str.substring(0, 1).toUpperCase() + str.substring(1);
        },
        onEnterEvent: function(event) {
        },
        onLeaveCurrentState: function(event) {
            //change current state to new state
            this.option('current', this.options['stateMap'][event][this.options['current']] || this.options['current']);
        },
        onEnterNewState: function(event) {
            //do something
        },
        onLeaveEvent: function(event) {
        },
        end: 0
    });
    $$.fsm.defaults = {
        initial: {event: 'startup', from: 'init', to: 'final', defer: false}, //e.g. {event: 'startup', from:'none', to:'final', defer:false}
        stateMap: {},  //e.g. {'startup':{'none':'final', 'on':'final'}}
        current: 'init',
        terminal: 'final',
        WILDCARD: '*',
        version: '1.0.0',
        scope: 'singleton',
        end: 0
    };
});