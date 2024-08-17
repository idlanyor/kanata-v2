import { expect } from 'chai';
import AI from '../command.js';

describe('AI', () => {
  describe('geminiText', () => {
    it('should return generated text based on prompt', async () => {
      const ai = new AI();
      const prompt = 'Hello, Gemini AI!';
      const result = await ai.geminiText(prompt);
      expect(result).to.be.a('string');
    });
  });

  describe('gptText', () => {
    it('should return generated text based on prompt', async () => {
      const ai = new AI();
      const prompt = 'Hello, GPT!';
      const result = await ai.gptText(prompt);
      expect(result).to.be.a('string');
    });
  });
});
