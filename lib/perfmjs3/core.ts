import {utils} from 'perfmjs/utils';
import {base} from 'perfmjs/base';
import {app} from 'perfmjs/app';
import {loader} from 'perfmjs/loader';

var _perfmjs = utils.root;
_perfmjs.base = base;
_perfmjs.app = app;
_perfmjs.loader = loader;

export var perfmjs = _perfmjs;