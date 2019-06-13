<template>
  <div class="events">
    <FullCalendar
      class="calendarapp"
      ref="fullCalendar"
      defaultView="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      :plugins="calendarPlugins"
      :events="calendarEvents"
      @dateClick="handleDateClick"
    />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import EventsService from "@/services/EventsService";
// must manually include stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
export default {
  name: "Events",
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
        listPlugin
      ],
      calendarEvents: []
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      const response = await EventsService.fetchEvents();
      this.calendarEvents = response.data.events;
    },
    handleDateClick(arg) {
      var self = this;
      this.$router.push({
        name: "AddEvent",
        query: { start: arg.date, allDay: arg.allDay }
      });
      this.$refs.fullCalendar.$emit('refetch-events')
    }
  }
};
</script>

<style>
.calendarapp {
  margin: 0 auto;
  max-width: 800px;
  max-height: 600px;
}
</style>
