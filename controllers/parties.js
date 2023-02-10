const axios = require("axios");

class PartiesController {
  // Fetch data Valorant agents
  static async valFetchAgents(req, res, next) {
    try {
      const dataAgents = [];

      const { data } = await axios({
        url: "https://valorant-api.com/v1/agents?isPlayableCharacter=true",
        method: "GET",
      });

      data.data.forEach((e) => {
        let agentDetail = {};

        agentDetail.uuid = e.uuid;
        agentDetail.name = e.displayName;
        agentDetail.description = e.description;
        agentDetail.icon = e.displayIcon;
        agentDetail.imgUrl = e.fullPortrait;
        agentDetail.role = e.role;
        agentDetail.abilities = e.abilities;

        dataAgents.push(agentDetail);
      });

      // console.log(data);
      res.status(200).json(dataAgents);
    } catch (error) {
      next(error);
    }
  }

  static async valFetchAgentDetail(req, res, next) {
    try {
      const { uuid } = req.params;
      const detailAgent = {};

      const { data } = await axios({
        url: `https://valorant-api.com/v1/agents/${uuid}`,
        method: "GET",
      });

      const resultData = data.data;

      detailAgent.uuid = resultData.uuid;
      detailAgent.name = resultData.displayName;
      detailAgent.description = resultData.description;
      detailAgent.icon = resultData.displayIcon;
      detailAgent.imgUrl = resultData.fullPortrait;
      detailAgent.role = resultData.role;
      detailAgent.abilities = resultData.abilities;

      res.status(200).json(detailAgent);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PartiesController;
