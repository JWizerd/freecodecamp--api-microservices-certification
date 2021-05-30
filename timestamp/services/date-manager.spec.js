const DateManager = require("./date-manager");

describe('DateManager', () => {
  describe('isValidDate', () => {
    it('should return false if date is not a supported format for the JavaScript Date object', () => {
      const dm = new DateManager("abc");
      const dm3 = new DateManager("abc123");
      expect(dm.isValidDate).toBe(false);
      expect(dm3.isValidDate).toBe(false);
      expect(dm.error).toBe("Invalid Date");
    });

    it('should return true if date is not a supported format for the JavaScript Date object', () => {
      const dm = new DateManager("2015-12-25");
      const dm2 = new DateManager(1451001600000);
      const dm3 = new DateManager("01-12-2010");
      expect(dm.isValidDate).toBe(true);
      expect(dm2.isValidDate).toBe(true);
      expect(dm3.isValidDate).toBe(true);
    });

    it('should return indetical unix timestamp if date param is already a unix timestamp', () => {
      const alreadyConvertedUnixTimestamp = 1451001600000;
      const dm = new DateManager(alreadyConvertedUnixTimestamp);
      expect(dm.unix).toEqual(alreadyConvertedUnixTimestamp);
    });

    it('should be a valid date object if date param in empty', () => {
      const dm = new DateManager();
      expect(dm.isValidDate).toEqual(true);
    });
  });
});