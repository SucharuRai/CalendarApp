<template>
  <div class="events">
    <h1>Add Event</h1>
    <div class="form">
      <div>
        <input type="text" name="title" placeholder="TITLE" v-model="title">
      </div>
      <div>
        <button class="app_event_btn" @click="addEvent">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventsService from "@/services/EventsService";
export default {
  name: "AddEvent",
  data() {
    return {
      title: "",
      start: "",
      allDay: ""
    };
  },
  methods: {
    parse_query_string(query) {
      var vars = query.split("&");
      var query_string = {};
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
          query_string[key] = decodeURIComponent(value);
          // If second entry with this name
        } else if (typeof query_string[key] === "string") {
          var arr = [query_string[key], decodeURIComponent(value)];
          query_string[key] = arr;
          // If third or later entry with this name
        } else {
          query_string[key].push(decodeURIComponent(value));
        }
      }
      return query_string;
    },
    async addEvent() {
      var query = window.location.search.substring(1);
      var qs = this.parse_query_string(query);
      var self = this;
      console.log(qs.start);
      await EventsService.addEvent({
        title: self.title,
        start: qs.start,
        allDay: qs.allDay
      });
      this.$router.push({
        name: "Events"
      });
    }
  }
};
</script>
<style type="text/css">
.form input {
  width: 500px;
  padding: 10px;
  border: 1px solid aqua;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_event_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>