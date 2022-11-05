new Vue({
  el: "#app",
  data: {
    start: false,
    monsterLife: 100,
    playerLife: 100,
    playerWon: false,
    monsterWon: false,
    showResult: false,
    log: [],
    monsterDamage: 0,
    playerDamage: 0,
  },

  methods: {
    attack() {
      this.monsterDamage = this.randomNum(10);
      this.playerDamage = this.randomNum(8);
      this.playerLife = Math.max(this.playerLife - this.monsterDamage, 0);
      this.monsterLife = Math.max(this.monsterLife - this.playerDamage, 0);

      this.whoWon();

      this.registerLog(`JOGADOR ATINGIU MONSTRO COM ${this.playerDamage}`, 'monster-log');
      this.registerLog(`MONSTRO ATINGIU JOGADOR COM ${this.monsterDamage}`, 'p-attack');

      console.log(this.log);
    },

    specialAttack() {
      this.monsterDamage = this.randomNum(10);
      this.playerDamage = this.randomNum(15);
      this.playerLife = Math.max(this.playerLife - this.monsterDamage, 0);
      this.monsterLife = Math.max(this.monsterLife - this.playerDamage, 0);

      this.whoWon();

      this.registerLog(`JOGADOR ATINGIU MONSTRO COM ${this.playerDamage}`, 'p-attack');
      this.registerLog(`MONSTRO ATINGIU JOGADOR COM ${this.monsterDamage}`, 'monster-log');
    },

    cure() {
      this.monsterDamage = this.randomNum(7);
      const plus = this.randomNum(5)
      const heal = Math.min(
        this.playerLife + plus - this.monsterDamage,
        100
      );
      this.playerLife = heal;
      
      this.registerLog(`JOGADOR GANHOU FORÇA DE ${plus}`, 'p-attack');
      this.registerLog(`MONSTRO ATINGIU JOGADOR COM ${this.monsterDamage}`, 'monster-log');

    },

    init() {
      this.playerLife = 100;
      this.monsterLife = 100;
      this.showResult = false;
      this.start = !this.start;
      this.monsterWon = false;
      this.playerWon = false;
      this.log = [];
    },

    whoWon() {
      if (this.playerLife === 0 || this.monsterLife === 0) {
        this.showResult = true;
        this.start = false;
        if (this.playerLife > this.monsterLife) this.playerWon = true;
        else this.monsterWon = true;
      }
    },

    exit() {
      this.log = [];

      if (this.playerLife < 100 && this.monsterLife < 100) {
        this.playerLife = 100;
        this.monsterLife = 100;
      }
      return (this.start = !this.start);
    },

    randomNum(n) {
      const value = Math.floor(Math.random() * n);
      return value;
    },

    registerLog(message, css) {
        this.log.unshift({message,css});
    }
  },

  computed: {
    player() {
      return {
        width: this.playerLife + "%",
      };
    },

    monster() {
      return {
        width: this.monsterLife + "%",
      };
    },

    danger1() {
      if (this.playerLife < 20)
        return {
          backgroundColor: "#eb3124",
        };
    },

    danger2() {
      if (this.monsterLife < 20)
        return {
          backgroundColor: "#eb3124",
        };
    },

    result() {
      if (this.playerLife < 0) {
        return (this.showResult = true);
      }
    },
  },
});
