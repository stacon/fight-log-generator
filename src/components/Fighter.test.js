// Test Tools
const expect = require("expect");

const Fighter = require("./Fighter").default;

describe("Fighter", () => {
  // Mock Data
  const mockName = "Petros Lalos";

  it("should correctly instantiate a fighter with the expected default range of values", () => {
    // WHEN
    const fighterInstance = Fighter();

    // THEN
    expect(fighterInstance.ID().length).toBe(11);

    const validInitiativeRollBonus =
      fighterInstance.initiativeRollBonus() > 0 &&
      fighterInstance.initiativeRollBonus() <= 4;
    expect(validInitiativeRollBonus).toBeTruthy();

    const validAttackRollBonus =
      fighterInstance.attackRollBonus() > 0 &&
      fighterInstance.attackRollBonus() <= 6;
    expect(validAttackRollBonus).toBeTruthy();

    expect(fighterInstance.HP()).toBe(100);

    const validDamageReduction =
      fighterInstance.damageReduction() >= 2 &&
      fighterInstance.damageReduction() <= 6;
    expect(validDamageReduction).toBeTruthy();

    const validArmorClass =
      fighterInstance.AC() > 10 && fighterInstance.AC() <= 17;
    expect(validArmorClass).toBeTruthy();
  });

  it("should correctly instantiate a fighter with given values", () => {
    // WHEN
    const fighterInstance = Fighter(mockName, 120, 4, 4, 5, 20, { 4: 3, 6: 2 });

    // THEN
    expect(fighterInstance.ID().length).toEqual(mockName.length);
    expect(fighterInstance.initiativeRollBonus()).toEqual(4);
    expect(fighterInstance.attackRollBonus()).toEqual(5);
    expect(fighterInstance.HP()).toBe(120);
    expect(fighterInstance.damageReduction()).toEqual(4);
    expect(fighterInstance.AC()).toEqual(20);
  });

  it("methods should set and get the expected values", () => {
    // GIVE
    const fighterInstance = Fighter();

    // THEN
    expect(fighterInstance.HP()).toBe(100);
    expect(fighterInstance.HP(80)).toBe(80);
    expect(fighterInstance.HP()).toBe(80);

    expect(fighterInstance.ID().substr(0, 4)).toEqual("temp");
    expect(fighterInstance.ID(mockName)).toEqual(mockName);
    expect(fighterInstance.ID()).toEqual(mockName);
  });
});
