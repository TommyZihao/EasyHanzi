import HanziWriter from 'hanzi-writer';
import RenderTarget from './RenderTarget';
import {
  removeEmptyKeys
} from './utils';
import defaultCharDataLoader from './defaultCharDataLoader';

export default class HanziWriterContext {
  constructor({
    ref,
    page,
    charDataLoader,
    character,
    onLoadCharDataError,
    onLoadCharDataSuccess,
    showOutline,
    showCharacter,

    // positioning options

    padding,

    // animation options

    strokeAnimationSpeed,
    strokeFadeDuration,
    strokeHighlightDuration,
    strokeHighlightSpeed,
    delayBetweenStrokes,
    delayBetweenLoops,

    // colors

    strokeColor,
    radicalColor,
    highlightColor,
    outlineColor,
    drawingColor,

    // quiz options

    leniency,
    showHintAfterMisses,
    highlightOnComplete,
    highlightCompleteColor,
  }) {
    if (!ref || !page) {
      throw new Error('parameter id, page are required');
    }

    // this.comp = page.selectComponent('#' + id);
    this.comp = page.$refs[ref]
    if (!this.comp) {
      throw new Error(`hanzi-writer-view with id ${id} not found`);
    }

    this.isDestroyed = false;

    this.writer = new HanziWriter(this.comp, removeEmptyKeys({
      width: this.comp.width,
      height: this.comp.height,
      charDataLoader: charDataLoader || defaultCharDataLoader,
      onLoadCharDataError,
      onLoadCharDataSuccess,
      showOutline,
      showCharacter,
      padding,
      strokeAnimationSpeed,
      strokeFadeDuration,
      strokeHighlightDuration,
      strokeHighlightSpeed,
      delayBetweenStrokes,
      delayBetweenLoops,
      strokeColor,
      radicalColor,
      highlightColor,
      outlineColor,
      drawingColor,
      leniency,
      showHintAfterMisses,
      highlightOnComplete,
      highlightCompleteColor,
      rendererOverride: {
        createRenderTarget: RenderTarget.init
      },
      renderer: 'canvas',
    }));

    if (character) {
      this.setCharacter(character);
    }
    this.comp.connectContext(this);
  }

  _ensureNotDestroyed() {
    if (this.isDestroyed) throw new Error('This context has already been destroyed');
  }

  showCharacter(options = {}) {
    this._ensureNotDestroyed();
    return this.writer.showCharacter(options);
  }

  hideCharacter(options = {}) {
    this._ensureNotDestroyed();
    return this.writer.hideCharacter(options);
  }

  animateCharacter(options = {}) {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.animateCharacter(options);
  }

  animateStroke(strokeNum, options = {}) {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.animateStroke(strokeNum, options);
  }

  loopCharacterAnimation(options = {}) {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.loopCharacterAnimation(options);
  }

  showOutline(options = {}) {
    this._ensureNotDestroyed();
    return this.writer.showOutline(options);
  }

  hideOutline(options = {}) {
    this._ensureNotDestroyed();
    return this.writer.hideOutline(options);
  }

  updateColor(colorName, colorVal, options = {}) {
    this._ensureNotDestroyed();
    return this.writer.updateColor(colorName, colorVal, options);
  }

  quiz(quizOptions = {}) {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(true);
    return this.writer.quiz(quizOptions);
  }

  cancelQuiz() {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.cancelQuiz();
  }

  setCharacter(character) {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.setCharacter(character);
  }

  trigger(evtName, evt) {
    this.writer.target.trigger(evtName, evt);
  }

  destroy() {
    if (this.isDestroyed) return;
    this.comp.disconnectContext();
    this.writer.target.removeAllListeners();
    this.writer.cancelQuiz();
    this.writer.hideCharacter();
    this.writer.hideOutline();
    this.isDestroyed = true;
  }
}
